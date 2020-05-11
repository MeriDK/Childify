from django.db import models
from django.contrib.auth.models import BaseUserManager
from Family.models import Family
# Create your models here.




class Child(models.Model):
    name_child = models.CharField(verbose_name="Name child", max_length=50, default="name")


class Status(models.Model):
    name_status = models.CharField(verbose_name="Name status", max_length=20)

class Category(models.Model):
    name_category = models.CharField(verbose_name="Name category", max_length=20)



class TaskManager(BaseUserManager):
  def create_task(self, id_family,id_status,id_category, name_task,info_task,point_task):
    task = self.model(
        id_family = id_family,
        id_status = id_status,
        id_category = id_category,
        name_task = name_task,
        info_task = info_task,
        point_task = point_task
    )
    task.save(using=self._db)
    return task


class Task (models.Model):
    id_family = models.ForeignKey(Family, on_delete=models.CASCADE, verbose_name='Family',null=True)
    id_status = models.ForeignKey(Status,on_delete=models.CASCADE,verbose_name='Status',null=True)
    id_category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Category', null=True)
    id_child = models.ForeignKey(Child, on_delete=models.CASCADE, verbose_name='Child', null=True)
    name_task = models.CharField(verbose_name="Name task", max_length=50)
    info_task = models.CharField(verbose_name="Info task", max_length=200,null=True)
    point_task = models.IntegerField(verbose_name='Point')
    object = TaskManager()
