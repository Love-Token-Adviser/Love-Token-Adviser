from django.urls import path
from .views import test_api
from .views import recommend_gift, recommend_outfit
from .views import add_to_favorites

urlpatterns = [
    path('test/', test_api, name='test_api'),
    path('recommend_gift/', recommend_gift, name='recommend_gift'),
    path('recommend_outfit/', recommend_outfit, name='recommend_outfit'),
    path('add_to_favorites/', add_to_favorites, name='add_to_favorites'),
]
