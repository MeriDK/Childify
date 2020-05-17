from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from .views import *
from . import views
app_name = 'task'
urlpatterns = [
    path('family/<int:id_family>/task/<int:id>/',TaskDetail.as_view()),
    #path('<int:id_family>/task_child/<int:id>/',TaskChildDetail.as_view()),
    url(r'(?P<id_family>[0-9]+)/task/list$', ParentTaskStatus.as_view({'get': 'list'})),
    #url(r'(?P<id_child>[0-9]+)/task/list/$', ChildTaskStatus.as_view({'get': 'list'})),
    path('family/<int:id_family>/task/create/',TaskCreate.as_view()),
]
