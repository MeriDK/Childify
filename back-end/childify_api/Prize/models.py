from django.db import models
from Family.models import Family


class Prize(models.Model):
    family_id = models.ForeignKey(Family, on_delete=models.CASCADE)
    points = models.IntegerField()
    name = models.TextField(max_length=30)
    about = models.TextField(max_length=500, default='')

    def __str__(self):
        return f'id: {self.id} family_id: {self.family_id} points: {self.points} name: {self.name} about: {self.about}'
