from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

import usersapp.views as usersapp

router = DefaultRouter()
router.register('usersapp', usersapp.UserModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
