from django.contrib import admin
from .models import book,borrowed,added


admin.site.register(book)
admin.site.register(borrowed)
admin.site.register(added)
