from django.urls import path
from .views import PostList, PostDetail, PostCreate, PostUpdate, PostDelete, PostChangeStatus, CommentCreate, CommentList, LikeCreate, LikeDelete

urlpatterns = [
    path('postList/', PostList.as_view(), name='post_list'),
    path('postDetail/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    path('postCreate/', PostCreate.as_view(), name='post_create'),
    path('postUpdate/', PostUpdate.as_view(), name='post_update'),
    path('postDelete/', PostDelete.as_view(), name='post_delete'),
    path('postChangeStatus/', PostChangeStatus.as_view(), name='post_change_status'),
    path('commentCreate/', CommentCreate.as_view(), name='comment_create'),
    path('commentList/', CommentList.as_view(), name='comment_list'),
    path('likeCreate/', LikeCreate.as_view(), name='like_create'),
    path('likeDelete/', LikeDelete.as_view(), name='like_delete'),
]