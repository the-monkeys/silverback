import bcrypt
from django.contrib.auth.backends import BaseBackend
from django.conf import settings


class EnvUser:
    def __init__(self, email):
        self.email = email
        self.is_authenticated = True
        self.backend = "dashboard.backends.EnvBackend"

    def get_username(self):
        return self.email

    def __str__(self):
        return self.email


class EnvBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        print("[AUTH BACKEND] Called with:", email)
        for user in settings.CREDENTIALS:
            if user["email"] == email and bcrypt.checkpw(password.encode(), user["password"].encode()):
                return EnvUser(email)
        return None

    def get_user(self, user_id):
        return None  # Not used as we don't store users in the database
