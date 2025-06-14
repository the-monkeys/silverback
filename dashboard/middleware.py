from django.shortcuts import redirect

EXEMPT_PATHS = [
    '/login/',
    '/verify/',
    '/static/',
    '/favicon.ico',
]

class AuthSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Allow exempt paths without login
        if any(request.path.startswith(path) for path in EXEMPT_PATHS):
            return self.get_response(request)

        # Check session for login
        if not request.session.get('authenticated_user'):
            return redirect('login')

        return self.get_response(request)
