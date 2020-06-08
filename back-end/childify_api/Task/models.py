from django.db import models
from django.contrib.auth.models import BaseUserManager
from Family.models import Family
from Child.models import Child
# Create your models here.




class Status(models.TextChoices):
    TODO = 1
    INPROGRESS = 2
    CHECK = 3
    DONE = 4



class Category(models.TextChoices):
    HOME = 1
    KITCHEN = 2
    EDUCATION = 3
    SHOP = 4
    PET = 5



class TaskManager(BaseUserManager):
  def create_task(self, id_family,status,category, name_task,info_task,point_task):
    task = self.model(
        id_family = id_family,
        status = status,
        category = category,
        name_task = name_task,
        info_task = info_task,
        point_task = point_task
    )
    task.save(using=self._db)
    return task


class Task (models.Model):
    id_family = models.ForeignKey(Family, on_delete=models.CASCADE, verbose_name='Family')
    status = models.SmallIntegerField(choices=Status.choices)
    category = models.SmallIntegerField(choices=Category.choices)
    id_child = models.ForeignKey(Child, on_delete=models.CASCADE, verbose_name='Child', null=True)
    name_task = models.CharField(verbose_name="Name task", max_length=50)
    info_task = models.CharField(verbose_name="Info task", max_length=200,null=True)
    point_task = models.IntegerField(verbose_name='Point')
    object = TaskManager()
