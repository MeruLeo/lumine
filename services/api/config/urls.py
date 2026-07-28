from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/v1/auth/', include('apps.authentication.urls')),
    path('api/v1/projects/', include('apps.projects.urls')),
    path('api/v1/notifications/', include('apps.notification.urls')),
    path('api/v1/profile/', include('apps.profile.urls')),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

