from django.urls import path, re_path, include
from . import views

app_name="blog"

urlpatterns = [   
    path('',views.index,name="index"),
    path('create/',views.blog_create,name="create"),
    re_path('(?P<slug>[\w-]+)/',views.blog_detail,name="detail")
]