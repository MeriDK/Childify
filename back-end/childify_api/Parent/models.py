from django.contrib.auth.base_user import BaseUserManager
from django.db import models

from Family.models import Family
from User.models import User

class ParentManager(BaseUserManager):
  def create_parent(self, family, user):
    parent = self.model(
      family = family,
      user = user
    )
    parent.save(using=self._db)
    return parent


class Parent(models.Model):
  parent_id = models.AutoField(primary_key = True )
  family = models.ForeignKey(Family, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
      return f'id: {self.parent_id} family: {self.family} user: {self.user}'

  object = ParentManager()
