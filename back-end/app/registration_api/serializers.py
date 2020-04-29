from rest_framework import serializers

from .models import User, Family

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'email', 'password', 'isParent']

class FamilyCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Family
    fields = ['name']

class FamilyConnectSerializer(serializers.ModelSerializer):
  class Meta:
    model = Family
    fields = []
