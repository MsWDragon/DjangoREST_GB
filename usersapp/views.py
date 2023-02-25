from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
