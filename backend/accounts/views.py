from numpy import generic
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.forms import CustomUserCreationForm
from .models import CustomUser
from .serializers import CustomUserSerializer 

# class CustomAccountCreationView(generic.CreateView):
#     model = CustomUser
#     form_class = CustomUserCreationForm
#     template_name = 'accounts/accounts_create.html'
    
@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
