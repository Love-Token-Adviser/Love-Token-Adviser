from django.urls import path
from .views import test_api
from .views import recommend_gift

urlpatterns = [
    path('test/', test_api, name='test_api'),
    path('recommend/', recommend_gift, name='recommend_gift'),
]
