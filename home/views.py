from django.shortcuts import render
from django.http import HttpResponse
from blog.models import Blog


# Create your views here.
def index(request):    
    # return HttpResponse("<h2>Home Index</h2>")
    title="HOMEPAGE"
    blogs = Blog.objects.all().order_by('date')
    return render(request,'home/index.html',locals())
def about(request):
    title="ABOUT"
    blogs = Blog.objects.all().order_by('date')
    return render(request,'home/about.html',locals())