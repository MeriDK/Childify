from rest_framework import serializers
from .models import Item
from Child.models import Child
from User.models import User


class ItemSerializer(serializers.ModelSerializer):
    child_icon = serializers.SerializerMethodField()

    # if child is not None return child ava id else None
    def get_child_icon(self, obj):
        if obj.child:
            child = Child.object.all().filter(id=obj.child.id).first()
            user = User.object.all().filter(user_id=child.user_id).first()
            return user.numIcon
        return None

    class Meta:
        model = Item
        fields = '__all__'
