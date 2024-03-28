from django.urls import path
from user_auth.views import Register, ChangePassword, UpdateProfile, Logout, GetProfile,UpdateProfilePhoto
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView


urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('getProfile/', GetProfile.as_view(), name='auth_get_profile'),
    path('register/', Register.as_view(), name='auth_register'),
    path('changePassword/', ChangePassword.as_view(), name='auth_change_password'),
    path('updateProfile/', UpdateProfile.as_view(), name='auth_update_profile'),
    path('updateProfilePhoto/', UpdateProfilePhoto.as_view(), name='auth_update_profile_photo'),
    path('logout/', Logout.as_view(), name='auth_logout'),
]

