from django.urls import path, include
from . import views
app_name = "home"
urlpatterns = [
     #http://localhost:8000/
    path('',views.index,name='index'),
    path('about/',views.about,name='about')
]