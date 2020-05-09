from rest_framework import serializers
from .models import Task


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('name_task','info_task','point_task')


class TaskSerializer(serializers.ModelSerializer):
    was_published_recently = serializers.BooleanField(read_only=True)
    class Meta:
        model = Task
        fields = '__all__'
