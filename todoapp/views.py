from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todoapp.filters import ProjectFilter, ToDoFilter
from todoapp.models import Project, ToDo
from todoapp.paginators import (ProjectPageNumberPagination,
                                ToDoPageNumberPagination)
from todoapp.serializers import ProjectSerializer, ToDoSerializer


class ProjectCustomDjangoFilterModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPageNumberPagination
    filterset_class = ProjectFilter


class ToDoCustomDjangoFilterModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoPageNumberPagination
    filterset_class = ToDoFilter

    def destroy(self, request, pk=None, *args, **kwargs):
        instance = get_object_or_404(ToDo, pk=pk)
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_202_ACCEPTED)
