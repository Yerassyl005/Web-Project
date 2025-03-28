from django.db import models

from django.db import models

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    oldLatynUrl = models.CharField(max_length=255)
    speakerId = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    shortDescription = models.TextField()
    thumbnailUrl = models.CharField(max_length=255)
    oldFileUrl = models.CharField(max_length=255)
    filePath = models.CharField(max_length=255)
    hasAudio = models.BooleanField(default=False)
    hasFile = models.BooleanField(default=False)
    language = models.CharField(max_length=255, default='kz')
    year = models.CharField(max_length=255, default='0000')
    addTime = models.PositiveIntegerField(null=True)
    updateTime = models.PositiveIntegerField(null=True)
    qStatus = models.PositiveSmallIntegerField(null=True)
    html = models.TextField()

    class Meta:
        db_table = 'book'  # match the existing table name

