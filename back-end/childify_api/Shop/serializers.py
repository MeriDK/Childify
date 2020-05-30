from rest_framework import serializers
from .models import Item
from Child.models import Child
from User.models import User


class ItemSerializer(serializers.ModelSerializer):
    child_icon = serializers.SerializerMethodField()

    # if child is not None return child ava id else None
    def get_child_icon(self, obj):
        child = Child.object.all().filter(id=obj.id).first()
        if child:
            user = User.object.all().filter(user_id=child.user_id).first()
            return user.numIcon
        else:
            return None

    class Meta:
        model = Item
        fields = '__all__'
