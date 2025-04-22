# project/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookView.as_view(), name='book-list'),
    path('books/<int:book_id>/', views.BookView.as_view(), name='book-detail'),
    path('books/<int:book_id>/progress/', views.ReadingProgressView.as_view(), name='reading-progress'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
