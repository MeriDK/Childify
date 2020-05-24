from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Item
from .serializers import ItemSerializer
from rest_framework import generics
from Child.models import Child
from Parent.models import Parent


class ItemListView(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        гет масиву для сім'ї в якій є юзер (дітей, батьків) з певним статусом
        GET  /item/?status=0
        """
        status = self.request.query_params.get('status', None)
        queryset = Item.objects.all().filter(status=status)

        child = 0
        if self.request.user.isParent:
            user = Parent.object.filter(user=self.request.user.user_id).first()
        else:
            user = Child.object.filter(user=self.request.user.user_id).first()
            child = user.id
        family = user.family.id
        queryset = queryset.filter(family=family)

        if status != '0' and child:
            queryset = queryset.filter(child=child)
        return queryset

    def post(self, request, *args, **kwargs):
        """
        пост створення нового айтему - можуть тільки батьки
        POST  /item/
        """
        if request.data.get('child', None) or request.data.get('family', None) or request.data.get('status', None):
            return Response({'message': 'no child family or status in request'}, status=400)
        if not request.user.isParent:
            return Response({'message': 'item can be created only by parent'}, status=400)

        user = Parent.object.filter(user=self.request.user.user_id).first()
        family = user.family.id
        request.data['family'] = family
        return self.create(request, *args, **kwargs)


def patch_check(request, kwargs, check_status):

    queryset = Item.objects.all()
    item = queryset.filter(id=kwargs['pk']).first()

    # check if request is from child
    if request.user.isParent != 0:
        return f'available only for child'

    # check if child and item have same families
    child = Child.object.filter(user=request.user.user_id).first()
    if item.family != child.family:
        return 'wrong family'

    # check for correct status
    if item.status != check_status:
        return f'status {check_status} only'

    # check if child from request and item child are similar
    if check_status == 1 and child.id != item.child.id:
        return 'item belongs to another child'

    # check for points
    if check_status == 0 and child.points < item.points:
        return 'not enough points'

    # everything is OK
    return 'OK'


def patch_func(request, kwargs, check_status, set_status):
    check = patch_check(request, kwargs, check_status)
    if check != 'OK':
        return Response({'message': check}, status=400)

    item = Item.objects.all().filter(id=kwargs['pk']).first()
    child = Child.object.filter(user=request.user.user_id).first()

    data = {}
    # receive
    if set_status == 1:
        child.points -= item.points
        data['child'] = child.id
    # return
    elif set_status == 0:
        child.points += item.points
        data['child'] = None
    child.save()

    data['status'] = set_status
    request._full_data = data
    return request


class ItemReceiveView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        """
        патч щоб редагувати статус - можуть тільки діти
        PATCH  /item/1/receive/              0 => 1           знімає бали
        """
        patch_res = patch_func(request, self.kwargs, 0, 1)
        if isinstance(patch_res, Response):
            return patch_res
        return self.partial_update(patch_res, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)


class ItemConfirmView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        """
        патч щоб редагувати статус - можуть тільки діти
        PATCH  /item/1/confirm/             1 => 2
        """
        patch_res = patch_func(request, self.kwargs, 1, 2)
        if isinstance(patch_res, Response):
            return patch_res
        return self.partial_update(patch_res, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)


class ItemReturnView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        """
        патч щоб редагувати статус - можуть тільки діти
        PATCH  /item/1/return/                1 => 0          вертає бали
        """
        patch_res = patch_func(request, self.kwargs, 1, 0)
        if isinstance(patch_res, Response):
            return patch_res
        return self.partial_update(patch_res, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)


def item_check(request, kwargs):

    item = Item.objects.all().filter(id=kwargs['pk']).first()

    # check if request is from parent
    if request.user.isParent != 1:
        return f'available only for parent'

    # check for correct status
    if item.status != 0:
        return 'status 0 only'

    # check if parent and item have same families
    parent = Parent.object.filter(user=request.user.user_id).first()
    if item.family != parent.family:
        return 'wrong family'

    # everything is OK
    return 'OK'


class ItemView(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        """
        редагування - можуть тільки батьки, коли статус 0
        PATCH /item/1/
        """
        item_check_res = item_check(request, self.kwargs)
        if item_check_res != 'OK':
            return Response({'message': item_check_res}, status=400)
        if 'child' in request.data or 'family' in request.data or 'status' in request.data:
            return Response({'message': 'cant change this field'}, status=400)
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)

    def delete(self, request, *args, **kwargs):
        """
        деліт щоб видаляти призи - можуть тільки батьки, коли статус 0
        DELETE  /item/1/
        """
        item_check_res = item_check(request, self.kwargs)
        if item_check_res != 'OK':
            return Response({'message': item_check_res}, status=400)
        return self.destroy(request, *args, **kwargs)
