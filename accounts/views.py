from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from blog.models import Blog

# Create your views here.

def members_view(request):    
    title = "Member List"
    members = User.objects.all().order_by('date_joined')
    blogs = Blog.objects.all().order_by('date')
    return render(request,'accounts/members.html',locals())

def signup_view(request):  
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            # log the user in
            return redirect('/blog/')
    else:
        form = UserCreationForm()

    title = "Sign Up"
    blogs = Blog.objects.all().order_by('date')
    return render(request,'accounts/signup.html',locals())

def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # log the user in
            user = form.get_user()
            login(request,user)
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect('/blog/')
    else:
        form = AuthenticationForm()

    blogs = Blog.objects.all().order_by('date')
    return render(request,'accounts/login.html',locals())

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('/blog/')



