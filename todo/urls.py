from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

import todoapp.views as todoapp
import usersapp.views as usersapp

router = DefaultRouter()
router.register('users', usersapp.UserModelViewSet)
router.register('projects', todoapp.ProjectModelViewSet)
router.register('todo', todoapp.ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
