# project/urls.py

from django.urls import path
from library.views import BookListAPIView, BookDetailAPIView

urlpatterns = [
    path('api/book/', BookListAPIView.as_view(), name='book-list'),
    path('api/book/<int:id>/', BookDetailAPIView.as_view(), name='book-detail'),
]
