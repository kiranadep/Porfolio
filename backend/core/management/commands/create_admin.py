from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os


class Command(BaseCommand):
    help = "Creates default admin superuser if it doesn't already exist"

    def add_arguments(self, parser):
        parser.add_argument('--username', default=os.getenv('ADMIN_USERNAME', 'admin'))
        parser.add_argument('--email', default=os.getenv('ADMIN_EMAIL', 'kiran221202adep@gmail.com'))
        parser.add_argument('--password', default=os.getenv('ADMIN_PASSWORD', 'admin123'))

    def handle(self, *args, **options):
        User = get_user_model()
        username = options['username']
        email = options['email']
        password = options['password']

        if User.objects.filter(username=username).exists():
            self.stdout.write(f"Superuser '{username}' already exists.")
        else:
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"[OK] Created superuser '{username}' with default password '{password}'."))
            self.stdout.write(self.style.WARNING("Make sure to change this password in the admin dashboard after logging in!"))

