from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Item
from .serializers import ItemSerializer
from rest_framework import generics
from Child.models import Child
from Parent.models import Parent


def check_family(user, family):
    user_info = Child.object.filter(user=user).first() or Parent.object.filter(user=user).first()
    if user_info.family.id != int(family):
        return False
    return True


class ItemListView(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Item.objects.all()
        family = self.request.query_params.get('family', None)
        child = self.request.query_params.get('child', None)
        status = self.request.query_params.get('status', None)

        if self.request.user.isParent:
            if child or not family or not status:
                raise ValidationError(detail='wrong filter usage')
        else:
            if bool(family) and (status != '0' or bool(child)):
                raise ValidationError(detail='wrong filter usage')
            if bool(child) and (status not in ('1', '2') or bool(family)):
                raise ValidationError(detail='wrong filter usage')

        if not check_family(self.request.user.user_id, family):
            raise ValidationError(detail='user isnt in this family')

        if family:
            queryset = queryset.filter(family=family)
        if child:
            queryset = queryset.filter(child=child)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def post(self, request, *args, **kwargs):
        if request.data.get('child', None):
            return Response({'message': 'no child in post'}, status=400)
        if not request.user.isParent:
            return Response({'message': 'item can create only parent'}, status=400)
        if not check_family(request.user.user_id, request.data.get('family')):
            return Response({'message': 'user isnt in this family'}, status=400)
        return self.create(request, *args, **kwargs)


class ItemView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def delete(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()
        if not check_family(request.user.user_id, item.family.id):
            return Response({'message': 'user isnt in this family'}, status=400)
        if not request.user.isParent:
            return Response({'message': 'item can delete only parent'}, status=400)
        if item.child:
            return Response({'message': 'you cant delete item if child chose it'}, status=400)
        return self.destroy(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if request.data.get('child', None):
            return Response({'message': 'cant change child, use /confirm or /set-child instead'}, status=400)
        if request.data.get('family', None):
            return Response({'message': 'changing family is forbidden'}, status=400)

        item = Item.objects.all().filter(id=self.kwargs['pk']).first()
        if not check_family(request.user.user_id, item.family.id):
            return Response({'message': 'user isnt in this family'}, status=400)
        if not request.user.isParent:
            return Response({'message': 'item can update only parent'}, status=400)
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)


class ItemSetChildView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()

        if item.child:
            return Response({'message': 'child already set'}, status=400)

        child = request.data.get('child', None)
        if not child:
            return Response({'message': 'child info should be in body'}, status=400)

        item_child = Child.object.filter(id=child).first()
        if item_child.family != item.family:
            return Response({'message': 'child not in this family'}, status=400)

        if not check_family(request.user.user_id, item.family.id):
            return Response({'message': 'user isnt in this family'}, status=400)
        if request.user.isParent:
            return Response({'message': 'item can set child only child'}, status=400)

        data = {
            'child': child,
            'status': 1
        }
        # delete all unnecessary fields and set needed data
        request._full_data = data
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)


class ItemConfirmView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = (IsAuthenticated,)

    def patch(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()

        if item.child is None:
            return Response({'message': 'child should be set'}, status=400)

        if not check_family(request.user.user_id, item.family.id):
            return Response({'message': 'user isnt in this family'}, status=400)
        if request.user.isParent:
            return Response({'message': 'item can validate only child'}, status=400)

        data = {
            'status': 2
        }
        # delete all unnecessary fields and set needed data
        request._full_data = data
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return Response(status=405)