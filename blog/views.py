from django.shortcuts import render, redirect
from .models import Blog
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from . import forms

# Create your views here.

def index(request):    
    title = "Blog Homepage"
    blogs = Blog.objects.all().order_by('date')
    return render(request,'blog/index.html',locals())

def blog_detail(request,slug):
    # return HttpResponse(slug)
    title = "Blog Homepage"
    blog = Blog.objects.get(slug=slug)
    blogs = Blog.objects.all().order_by('date')
    return render(request,'blog/blog_detail.html',locals())

@login_required(login_url="/accounts/login/")
def blog_create(request):
    title = "Blog Homepage"
    if request.method == 'POST':
        form = forms.CreateBlog(request.POST,request.FILES)
        if form.is_valid():
            #save blog to db
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            return redirect('/blog/')
    else:
        form = forms.CreateBlog()
    
    blogs = Blog.objects.all().order_by('date')
    return render(request,'blog/blog_create.html',locals())