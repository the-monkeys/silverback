import json
import os

import libsql
import requests
from django.shortcuts import render, redirect
from django.core.signing import TimestampSigner, SignatureExpired, BadSignature
from django.core.mail import send_mail
from django.urls import reverse

from silverback.settings import DISCORD_BOT_BASE_URL, DB_NAME, DB_URL, DB_AUTH_TOKEN
from .forms import LoginForm
from django.conf import settings

signer = TimestampSigner()

conn = libsql.connect(DB_NAME, sync_url=DB_URL, auth_token=DB_AUTH_TOKEN)
conn.sync()

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
    bot_status = "unhealthy"
    try:
        response = requests.get(DISCORD_BOT_BASE_URL)
        if response.status_code == 200:
            bot_status = response.text
    except requests.exceptions.RequestException as e:
        print(e)

    query = conn.execute('SELECT config FROM orangutan').fetchall()
    commands = json.loads(query[0][0])

    return render(request, "discord.html", { "bot_status": bot_status, "commands": commands })

def discord_command_view(request, command):
    return render(request, "discord-command.html", {"command_name": command})
