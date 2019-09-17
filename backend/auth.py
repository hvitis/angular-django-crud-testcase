from django.conf import settings
# not-deprecated library for token validation
from google.oauth2 import id_token
from google.auth.transport import requests

from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import (
    TokenAuthentication, SessionAuthentication)


class GoogleAuthentication(TokenAuthentication):
    def __init__(self, *args, **kwargs):
        self.request = None
        super().__init__(*args, **kwargs)

    def authenticate(self, request):
        self.request = request
        return super().authenticate(request)

    def authenticate_credentials(self, token):
        SystemUser = get_user_model()
        _token = self.request.session.get('token')
        email = self.request.session.get('email')

        # Using id_token with new not-deprecated library
        if token != _token:
            try:
                # Specify the CLIENT_ID of the app that accesses the backend:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)
                if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                    raise ValueError('Wrong issuer.')
                # ID token is valid. 
                # Get the user's Google Account ID from the decoded token.
                userid = idinfo['sub']
                # Get the user's email from the decoded token.
                email = idinfo['email']
            except ValueError:
                # Invalid token
                raise AuthenticationFailed('Invalid token.')
        user, created = SystemUser.objects.get_or_create(email=email, username=email, is_superuser=True)
        self.request.session['token'] = token
        self.request.session['email'] = email
        return (user, token)

class CustomSessionAuthentication(SessionAuthentication):
    def authenticate_header(self, request):
        return 'OAuth realm="api"'
