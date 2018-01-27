from django.urls import path, re_path, include
from . import views

app_name="accounts"

urlpatterns = [   
    path('',views.members_view,name="members"),
    path('signup/',views.signup_view,name="signup"),
    path('login/',views.login_view,name="login"),
    path('logout/',views.logout_view,name="logout")
]