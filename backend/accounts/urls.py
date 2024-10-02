from django.urls import path
from .views import CustomAccountCreationView

app_name = 'accounts'

urlpatterns = [
    path('signup/', CustomAccountCreationView.as_view(), name='custom_accounts_create'),
]