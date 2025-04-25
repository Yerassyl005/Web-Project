from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.urls import resolve
import re

class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print("Middleware called for path:", request.path_info)
        print("Request method:", request.method)
        print("Request headers:", request.headers)

        public_paths = [
            '/api/auth/login',
            '/api/auth/register',
            '/api/auth/token/refresh',
            '/admin',
            '/admin/login',
        ]

        # Check if the current path is public
        current_path = request.path_info.rstrip('/')  # Remove trailing slash for comparison
        print("Current path:", current_path)
        
        # Check if path starts with any public path
        if any(current_path == path or current_path.startswith(path + '/') for path in public_paths):
            print("Public path detected, allowing access")
            return None

        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        print("Auth header:", auth_header)
        
        if not auth_header:
            print("No token provided, returning 401")
            return JsonResponse({'error': 'No token provided'}, status=401)

        try:
            # Extract the token from the header
            token = auth_header.split(' ')[1]
            # Validate the token
            AccessToken(token)
            print("Token validated successfully")
            return None
        except (IndexError, TokenError, InvalidToken) as e:
            print("Token validation failed:", str(e))
            return JsonResponse({'error': 'Invalid token'}, status=401) 