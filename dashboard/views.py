from django.shortcuts import render, redirect
from django.core.signing import TimestampSigner, SignatureExpired, BadSignature
from django.core.mail import send_mail
from django.urls import reverse
from .forms import LoginForm

signer = TimestampSigner()


# Create your views here.
def home(request):
    return render(request, "home.html")


def login_view(request):
    error = ""
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            from django.contrib.auth import authenticate

            user = authenticate(
                request,
                email=form.cleaned_data["email"],
                password=form.cleaned_data["password"],
            )
            if user:
                # Send magic link
                token = signer.sign(user.email)
                verify_url = request.build_absolute_uri(
                    reverse("verify") + f"?token={token}"
                )
                send_mail(
                    "Your Magic Link",
                    f"Click to verify: {verify_url}",
                    "no-reply@example.com",
                    [user.email],
                )
                request.session["pending_email"] = user.email
                return render(request, "magic_sent.html")
            else:
                error = "Invalid credentials"
    else:
        form = LoginForm()
    return render(request, "login.html", {"form": form, "error": error})


def verify_view(request):
    token = request.GET.get("token")
    try:
        email = signer.unsign(token, max_age=300)  # 5 min expiry
        if request.session.get("pending_email") == email:
            request.session["authenticated_user"] = email
            return redirect("home")
    except (SignatureExpired, BadSignature):
        return render(request, "magic_expired.html")
    return redirect("login")


def logout_view(request):
    request.session.flush()  # Clears all session data
    return redirect("login")
