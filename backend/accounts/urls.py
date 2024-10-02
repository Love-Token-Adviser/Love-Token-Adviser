from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('signup/', create_user, name='custom_accounts_create'),
]