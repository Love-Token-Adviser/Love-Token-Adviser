from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.CustomAccountCreationView.as_view(), name='signup'),

    path('login/', views.Login.as_view(), name='login'),

    path('home/', login_required(views.Home.as_view()), name='home'),
]