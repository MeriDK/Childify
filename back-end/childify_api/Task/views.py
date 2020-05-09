from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import Task
from .models import Status
from Family.models import Family


class TaskDetail(APIView):

    def get(self, request, *args, **kwargs):
        question = get_object_or_404(Task,id_family=kwargs['id_family'], pk=kwargs['id'])
        serializer = TaskSerializer(question)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Task,id_family=kwargs['id_family'], pk=kwargs['id'])
        serializer = TaskSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            question = serializer.save()
            return Response(TaskSerializer(question).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        question = get_object_or_404(Task,id_family=kwargs['id_family'], pk=kwargs['id'])
        question.delete()
        return Response("Task deleted", status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        question = get_object_or_404(Task,id_family=kwargs['id_family'], pk=kwargs['id'])
        serializers = TaskSerializer(question, data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



class TaskCreate(APIView):

    def post(self, request,id_family):
        if request.method == "POST":
            serializers = TaskCreateSerializer(data = request.data)
            if serializers.is_valid():
                    family = Family.object.get(id=1)
                    status = Status.objects.get(id=1)
                    task= Task.object.create_task(family,status,serializers.data['name_task'],serializers.data['info_task'],serializers.data['point_task'])
                    return JsonResponse({"info":"task create"},status = 201)
            return JsonResponse(serializers.data,status = 400)




class ParentTaskStatus(viewsets.ViewSet):


    def list(self, request, id_family=None):
        try:
            name_status = request.GET.get('status','')
            status = Status.objects.get(name_status = name_status)
            queryset = Task.object.filter(id_family=id_family, id_status=status)

        except:
            queryset = Task.object.filter(id_family=id_family)

        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)
