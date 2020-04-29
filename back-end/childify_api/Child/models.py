from django.contrib.auth.base_user import BaseUserManager
from django.db import models

from User.models import User
from Family.models import Family


class ChildManager(BaseUserManager):
  def create_child(self, family, user):
    child = self.model(
      family = family,
      user = user
    )
    child.save(using=self._db)
    return child

class Child(models.Model):
  child_id = models.AutoField(primary_key = True)
  family = models.ForeignKey(Family, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  points = models.IntegerField(default=0)

  def __str__(self):
      return f'id: {self.child_id} family: {self.family} user: {self.user} points: {self.points}'

  object = ChildManager()
