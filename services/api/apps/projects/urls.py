from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

# روتر برای پروژه
router.register("", ProjectViewSet, basename="projects")
# روتر برای درخواست اهای پروژه
router.register("requests", ProjectRequestView, basename="project_requests")


# آدرس های پروژه
urlpatterns = [
    path("employer", ProjectEmployerListView.as_view()),
    path("model", ProjectModelListView.as_view()),
]

urlpatterns += router.urls