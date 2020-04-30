from Child.models import Child
from Prize.models import Prize
from django.db import models


class PrizeStatusEnum(models.TextChoices):
    ASKED = 0
    RECEIVED = 1


class ChildPrize(models.Model):
    child_id = models.ForeignKey(Child, on_delete=models.CASCADE)
    status_id = models.SmallIntegerField(PrizeStatusEnum, default=PrizeStatusEnum.ASKED)
    prize_id = models.ForeignKey(Prize, on_delete=models.CASCADE)

    def __str__(self):
        return f'id: {self.id} child_id: {self.child_id} status_id: {self.status_id} prize_id: {self.prize_id}'
