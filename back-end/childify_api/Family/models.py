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
  id = models.AutoField(primary_key = True )
  name = models.CharField(max_length=32)

  object = FamilyManager()
