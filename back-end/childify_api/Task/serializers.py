from rest_framework import serializers
from .models import Task
from Child.models import Child
from User.models import User


class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('category','name_task','info_task','point_task')

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

class TaskIconSerializer(serializers.ModelSerializer):
    child_icon = serializers.SerializerMethodField()

    # if child is not None return child ava id else None
    def get_child_icon(self, obj):
        if obj.id_child:
            child = Child.object.all().filter(id=obj.id_child.id).first()
            user = User.object.all().filter(user_id=child.user_id).first()
            return user.numIcon
        return None
    class Meta:
        model = Task
        fields = '__all__'
