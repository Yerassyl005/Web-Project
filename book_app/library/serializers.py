from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = [
            'id',
            'oldLatynUrl',
            'speakerId',
            'title',
            'shortDescription',
            'thumbnailUrl',
            'oldFileUrl',
            'filePath',
            'hasAudio',
            'hasFile',
            'language',
            'year',
            'addTime',
            'updateTime',
            'qStatus',
            'html',
        ]
