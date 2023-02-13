from rest_framework.viewsets import ModelViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
