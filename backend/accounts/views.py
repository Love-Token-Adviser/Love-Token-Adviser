from django.views import generic
from .forms import CustomUserCreationForm
from .models import CustomUser


class CustomAccountCreationView(generic.CreateView):
    model = CustomUser
    form_class = CustomUserCreationForm
    template_name = 'accounts/accounts_create.html'