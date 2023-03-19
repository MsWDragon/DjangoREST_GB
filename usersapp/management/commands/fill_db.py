import json

from django.core.management.base import BaseCommand

from usersapp.models import User


def load_json(file):
    with open(file, 'r', encoding='utf-8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = load_json('usersapp/fixtures/001_users.json')
        User.objects.all().delete()
        for user in users:
            new_user = user['fields']
            User(
                pk=user['pk'],
                username=new_user['username'],
                first_name=new_user['first_name'],
                last_name=new_user['last_name'],
                email=new_user['email'],
            ).save()

        User.objects.create_superuser('admin', 'admin@local.host', 'admin')
