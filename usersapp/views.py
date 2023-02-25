from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer, UserModelSerializerVer02


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerVer02
        return UserModelSerializer
