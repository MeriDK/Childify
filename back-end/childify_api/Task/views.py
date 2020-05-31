from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import Task
from .models import Status,Category
from Family.models import Family
from Parent.models import Parent
from Child.models import Child
from User.models import User


class TaskDetail(APIView):

    def get(self, request, *args, **kwargs):
        question = get_object_or_404(Task,pk=kwargs['id'])
        serializer = TaskSerializer(question)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        serializer = TaskSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            question = serializer.save()
            return Response(TaskSerializer(question).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        question.delete()
        return Response("Task deleted", status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        serializers = TaskSerializer(question, data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class AddPoint(APIView):

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        serializers = TaskSerializer(question,data=request.data,  partial=True)
        if serializers.is_valid():
            user = User.object.get(user_id=serializers.data['id_child'])
            child = Child.object.get(user=user)
            point = child.points
            point += serializers.data['point_task']
            point = {'points':point}
            question = get_object_or_404(Child, pk=child.id)
            point = PointSerializer(question,data=point, partial= True)
            if point.is_valid():
                point.save()
                print(point.data)
                return Response(point.data)
        return Response(serializers.errors)


class TaskCreate(APIView):

    def post(self, request):
        if request.method == "POST":
            serializers = TaskCreateSerializer(data = request.data)
            user = User.object.get(user_id=request.user.user_id)
            if request.user.isParent:
                family = Parent.object.get(user=user)
            else:
                family = Child.object.get(user=user)
            family = Family.object.get(id=family.family.id)
            print(family)
            if serializers.is_valid():

                task= Task.object.create_task(family,1,serializers.data['category'],serializers.data['name_task'],serializers.data['info_task'],serializers.data['point_task'])
                return JsonResponse({"info":"task create"},status = 201)
            return JsonResponse(serializers.data,status = 400)


class ParentTaskStatus(viewsets.ViewSet):

    def list(self, request, id_family=None):
        if request.user.isParent:
            user = Parent.object.get(user = request.user)
        else:
            user = Child.object.get(user=request.user)


        try:
            name_status = request.GET.get('status','')
            if name_status == "inProgress":
                status = 2
            elif name_status == "check":
                status = 3
            elif name_status == "done":
                status = 4

            if name_status == "todo":
                queryset = Task.object.filter(id_family=user.family, status=1)
            else:
                print("OK", request.user.isParent)
                print(request.user.user_id)
                if request.user.isParent:
                    queryset = Task.object.filter(id_family=user.family, status=status)
                else:
                    print("Child",status)
                    queryset = Task.object.filter(id_family=user.family,id_child = request.user, status=status)

        except:
            queryset = Task.object.filter(id_family=id_family)
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)
