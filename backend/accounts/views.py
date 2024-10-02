from django.views import generic
from django.contrib.auth.models import User
from .forms import  CustomUserCreationForm
from .models import CustomUser
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.base import TemplateView

class CustomAccountCreationView(generic.CreateView):
    model = CustomUser
    form_class = CustomUserCreationForm
    template_name = 'accounts/accounts_create.html'
    success_url = '/accounts/custom_accounts_create'

class Login(LoginView):
    template_name = 'accounts/login.html'

class Logout(LogoutView):
    next_page = '/accounts/login'

class Home(TemplateView):
    template_name = 'accounts/home.html'