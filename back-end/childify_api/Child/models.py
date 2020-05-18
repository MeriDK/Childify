from django.contrib.auth.base_user import BaseUserManager
from django.db import models

from User.models import User, MyUserManager
from Family.models import Family


class ChildManager(BaseUserManager):
  def create_child(self, family, user, username):
    child = self.model(
      family = family,
      user = user
    )
    MyUserManager.addUsername(user, username)
    child.save(using=self._db)
    return child


class Child(models.Model):
  family = models.ForeignKey(Family, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  points = models.IntegerField(default=0)

  def __str__(self):
      return f'id: {self.id} family: {self.family} user: {self.user} points: {self.points}'

  object = ChildManager()
