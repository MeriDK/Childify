from django.db import models
from Family.models import Family
from Child.models import Child


class StatusEnum(models.TextChoices):
    WISH = 0
    ORDER = 1
    RECEIVE = 2


class CategoryEnum(models.TextChoices):
    ENTERTAINMENT = 0
    SPORT = 1
    SWEET = 2
    GAME = 3
    BOOK = 4


class Item(models.Model):
    points = models.IntegerField()
    name = models.TextField(max_length=30)
    about = models.TextField(max_length=500, default='')
    status = models.SmallIntegerField(choices=StatusEnum.choices, default=StatusEnum.WISH)
    category = models.SmallIntegerField(choices=CategoryEnum.choices)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    child = models.ForeignKey(Child, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'id: {self.id} points: {self.points} name: {self.name} about: {self.about} status: {self.status} ' \
               f'category {self.category} family {self.family} child {self.child}'
