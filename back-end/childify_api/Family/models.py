from django.db import models
from django.contrib.auth.models import  BaseUserManager

class FamilyManager(BaseUserManager):
  def create_family(self):
    family = self.model(
    )
    family.save(using=self._db)
    return family

class Family(models.Model):

  def __str__(self):
      return f'id: {self.id}'

  object = FamilyManager()
