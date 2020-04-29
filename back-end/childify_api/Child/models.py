from django.db import models
from Family.models import Family


class Child(models.Model):
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    user_id = models.IntegerField(default=None)
    points = models.IntegerField(default=0)

    def __str__(self):
        return f'id: {self.id} family_id: {self.family} user_id: {self.user_id} points: {self.points}'
