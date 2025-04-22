from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Book, ReadingProgress
from .serializers import (
    UserSerializer,
    BookSerializer,
    ReadingProgressSerializer,
    UserRegistrationSerializer
)

# Function-Based Views
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token)
        })
    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Class-Based Views
class BookListView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

class BookDetailView(APIView):
    def get(self, request, pk):
        try:
            book = Book.objects.get(pk=pk)
            serializer = BookSerializer(book)
            return Response(serializer.data)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class ReadingProgressView(APIView):
    def get(self, request, book_id):
        try:
            progress = ReadingProgress.objects.get(book_id=book_id)
            serializer = ReadingProgressSerializer(progress)
            return Response(serializer.data)
        except ReadingProgress.DoesNotExist:
            return Response({
                'last_page': 0,
                'is_completed': False
            })

    def post(self, request, book_id):
        try:
            progress = ReadingProgress.objects.get(book_id=book_id)
            serializer = ReadingProgressSerializer(progress, data=request.data, partial=True)
        except ReadingProgress.DoesNotExist:
            serializer = ReadingProgressSerializer(data={
                'book': book_id,
                **request.data
            })

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 