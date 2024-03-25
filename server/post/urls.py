from django.urls import path
from .views import PostList, PostDetail, PostCreate, PostUpdate, PostDelete, PostChangeStatus

urlpatterns = [
    path('postList/', PostList.as_view(), name='post_list'),
    path('postDetail/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    path('postCreate/', PostCreate.as_view(), name='post_create'),
    path('postUpdate/<int:pk>/', PostUpdate.as_view(), name='post_update'),
    path('postDelete/<int:pk>/', PostDelete.as_view(), name='post_delete'),
    path('postChangeStatus/<int:pk>/', PostChangeStatus.as_view(), name='post_change_status'),
]