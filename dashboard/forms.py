from django import forms

class LoginForm(forms.Form):
    email = forms.EmailField()

class CreateDevUserForm(forms.Form):
    first_name = forms.TextInput()
    last_name = forms.TextInput()
    username = forms.TextInput()
    email = forms.EmailField()
    is_verified = forms.CheckboxInput()