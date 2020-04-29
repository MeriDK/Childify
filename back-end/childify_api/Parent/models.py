from django.contrib.auth.base_user import BaseUserManager
from django.db import models

from Family.models import Family
from User.models import User

class ParentManager(BaseUserManager):
  def create_parent(self, family_id, user_id):
    parent = self.model(
      family_id = family_id,
      user_id = user_id
    )
    parent.save(using=self._db)
    return parent


class Parent(models.Model):
  parent_id = models.AutoField(primary_key = True )
  family_id = models.ForeignKey(Family, on_delete=models.CASCADE)
  user_id = models.ForeignKey(User, on_delete=models.CASCADE)

  object = ParentManager()
