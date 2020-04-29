from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionManager

class FamilyManager(BaseUserManager):
  def create_family(self, name):
    family = self.model(
      name =name
    )
    family.save(using=self._db)
    return family

class Family(models.Model):
  name = models.CharField(max_length=32)

  def __str__(self):
      return f'id: {self.id} name: {self.name}'

  object = FamilyManager()
