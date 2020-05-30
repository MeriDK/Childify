from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from .views import *
from . import views
app_name = 'task'
urlpatterns = [
    path('task/<int:id>/',TaskDetail.as_view()),
    url(r'task/list$', ParentTaskStatus.as_view({'get': 'list'})),
    path('task/create/',TaskCreate.as_view()),
    path('task/point/<int:id>',AddPoint.as_view()),
]
