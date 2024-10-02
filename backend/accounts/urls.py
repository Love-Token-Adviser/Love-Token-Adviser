from django.urls import path
from .views import CustomAccountCreationView, Login

app_name = 'accounts'

urlpatterns = [
    path('signup/', CustomAccountCreationView.as_view(), name='custom_accounts_create'),

    path('login/', Login.as_view(), name='login'),
]