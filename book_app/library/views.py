from django.shortcuts import render

from rest_framework import generics
from .models import Book
from .tools import BookPagination
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from rest_framework.renderers import JSONRenderer

from .serializers import BookSerializer


class BookListAPIView(generics.ListAPIView):
    renderer_classes = [JSONRenderer]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination
    
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    
    filterset_fields = ['language', 'hasAudio', 'hasFile']
    search_fields = ['title', 'shortDescription']
    ordering_fields = ['addTime', 'updateTime', 'title', 'year']
    ordering = ['-addTime']

class BookDetailAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'id'  

    

