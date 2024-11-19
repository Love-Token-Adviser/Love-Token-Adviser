from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('signup/', create_user, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
]