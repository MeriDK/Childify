from rest_framework import serializers
from .models import Task
from Child.models import Child


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id_category','name_task','info_task','point_task')

class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    was_published_recently = serializers.BooleanField(read_only=True)
    class Meta:
        model = Task
        fields = '__all__'


class Point(serializers.ModelSerializer):
    was_published_recently = serializers.BooleanField(read_only=True)
    class Meta:
        model = Child
        fields = '__all__'
