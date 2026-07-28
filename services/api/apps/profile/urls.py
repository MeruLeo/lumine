from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("models", GetModelView, basename="models")
router.register("employers", GetEmployerView, basename="employers")


urlpatterns = [
    path('me/', UserProfileView.as_view()),
    path('me/images', MeImagesPortfolioView.as_view()),
    path('me/categories', MeCategoriesView.as_view()),
    path('me/roles', MeRolesView.as_view()),
    path('me/technical-info', MeThecnicalInfoView.as_view()),
    path('me/employer-profile', MeEmployerProfileView.as_view()),
    path('me/instructor-profile', MeInstructorProfileView.as_view()),
    path('me/basic-info', MeBasicInfoView.as_view()),
]

urlpatterns += router.urls