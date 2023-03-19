import todoapp.views as todoapp
import usersapp.views as usersapp
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework.authtoken import views as authtoken
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo',
        default_version='0.1',
        description='Документация API нашего проекта.',
        contact=openapi.Contact(name='Anton Mindlin', email='anton.mindlin@gmail.com'),
        license=openapi.License(name='MIT license')
    ),
    public=True,
    permission_classes=[AllowAny],
)

router = DefaultRouter()
router.register('users', usersapp.UserModelViewSet)
router.register('projects', todoapp.ProjectCustomDjangoFilterModelViewSet)
router.register('todo', todoapp.ToDoCustomDjangoFilterModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', authtoken.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('swagger/', schema_view.with_ui('swagger')),
    path('swagger<str:format>', schema_view.without_ui()),

    path('graphql/', GraphQLView.as_view(graphiql=True))
]
