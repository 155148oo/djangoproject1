from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    body = models.TextField()
    source = models.TextField(blank="true")
    date = models.DateTimeField(auto_now_add=True)
    thumb = models.ImageField(default="default.png", blank="true")
    author = models.ForeignKey(User,on_delete=models.CASCADE,default=None)

    def __str__(self):
        return self.title

    def snippet(self):
        return self.body[:50] + "..."