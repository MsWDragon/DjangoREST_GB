from django.db import models
from usersapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    admin_user = models.ForeignKey(User, related_name='admin_user', on_delete=models.PROTECT, default=1)
    repo_url = models.CharField(max_length=128, blank=True)
    users = models.ManyToManyField(User, related_name='users')

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
