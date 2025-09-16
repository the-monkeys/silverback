from django.shortcuts import render, redirect
from django.core.signing import TimestampSigner, SignatureExpired, BadSignature
from django.core.mail import send_mail
from django.urls import reverse
from .forms import LoginForm
from django.conf import settings

signer = TimestampSigner()


# Create your views here.
def home(request):
    return render(request, "home.html")


def login_view(request):
    error = ""
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            if email in settings.CREDENTIALS:
                print("[LOGIN] Valid email:", email)
                print("[LOGIN] setting.Credentials:", settings.CREDENTIALS)
                token = signer.sign(email)
                verify_url = request.build_absolute_uri(
                    reverse("verify") + f"?token={token}"
                )
                send_mail(
                    "Your Magic Login Link",
                    f"Click to log in: {verify_url}",
                    "no-reply@example.com",
                    [email],
                )
                request.session["pending_email"] = email
                return render(request, "magic_sent.html")
            else:
                error = "Email not recognized"
    else:
        form = LoginForm()
    return render(request, "login.html", {"form": form, "error": error})


def verify_view(request):
    token = request.GET.get("token")
    try:
        email = signer.unsign(token, max_age=1800)  # 30 min expiry
        if request.session.get("pending_email") == email:
            request.session["authenticated_user"] = email
            return redirect("home")
    except (SignatureExpired, BadSignature):
        return render(request, "magic_expired.html")
    return redirect("login")


def logout_view(request):
    request.session.flush()  # Clears all session data
    return redirect("login")


def discord_view(request):
    # discord_api_url = f"https://raw.githubusercontent/"
    # requests.get(discord_api_url)

    discord_commands = [{"command_id": 1, "command_name": "healthcheck",
                         "description": "Get health status of monkeys server"}]

    return render(request, "discord.html", {"discord_commands": discord_commands})


def discord_command_view(request, command):
    return render(request, "discord-command.html", {"command_name": command})
