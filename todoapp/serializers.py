from rest_framework.serializers import ModelSerializer, StringRelatedField

from todoapp.models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    project = StringRelatedField()
    author = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
