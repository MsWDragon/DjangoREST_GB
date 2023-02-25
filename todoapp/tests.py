from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APITestCase

from todoapp.models import Project, ToDo
from usersapp.models import User


class TestToDoViewSet(APITestCase):
    def setUp(self) -> None:
        self.admin_login = 'admin'
        self.admin_pass = 'Admin123456'
        self.admin_email = 'admin@admin.com'
        self.admin = User.objects.create_superuser(
            username=self.admin_login,
            password=self.admin_pass,
            email=self.admin_email
        )
        self.todo_data = mixer.blend(ToDo)
        self.todo_put = mixer.blend(ToDo, text='put_todo_text')
        self.url = '/api/todo/'

    def test_get_list(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self) -> None:
        temp_todo = self.todo_data
        response = self.client.get(f'{self.url}{temp_todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_guest(self) -> None:
        temp_todo = self.todo_data
        response = self.client.put(f'{self.url}{temp_todo.id}/', {'text': 'hello_world'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_admin(self) -> None:
        temp_todo = self.todo_data
        self.client.login(username=self.admin_login, password=self.admin_pass)
        response = self.client.put(
            f'{self.url}{temp_todo.id}/',
            {'text': 'hello_world'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
