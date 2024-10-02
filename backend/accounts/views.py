from django.views import generic
from .forms import CustomUserCreationForm
from .models import CustomUser
from django.contrib.auth.views import LoginView, LogoutView

class CustomAccountCreationView(generic.CreateView):
    model = CustomUser
    form_class = CustomUserCreationForm
    template_name = 'accounts/accounts_create.html'
    success_url = '/accounts/login'

class Login(LoginView):
    template_name = 'accounts/login.html'