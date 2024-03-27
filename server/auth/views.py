from django.shortcuts import render

# Create your views here.
from .serializers import RegisterSerializer, ChangePasswordSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken


class Register(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class ChangePassword(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
    
    def post(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response(
                {"message": "Password updated successfully"},
                status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


class UpdateProfile(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
    
    def post(self, request, *args, **kwargs):  # Updated method to post
        user = self.get_object()
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            updated_user = serializer.save()
            user_data = UserSerializer(updated_user).data
            user_data["is_user_admin"] = user.is_staff  # Add is_user_admin to user data
            return Response(user_data, status=status.HTTP_200_OK)  # Return user data with is_user_admin
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT, data={"message": "Logout successful"})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Invalid token"})

class GetProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        is_user_admin = user.is_staff  # Check if user is admin
        return Response({**serializer.data, "is_user_admin": is_user_admin})
