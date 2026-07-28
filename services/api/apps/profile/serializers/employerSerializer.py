from rest_framework import serializers
from apps.authentication.models import User
from .getMeSerializer import (GroupSerializer, ImagePortfolioSerializer, 
                              EmployerProfileSerializer)
from apps.authentication.models import Category


class CategorySserializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "persion_name", "type"]


class EmployerSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(read_only=True, many=True)
    categories = CategorySserializer(read_only=True, many=True)
    image_portfolio = ImagePortfolioSerializer(read_only=True, many=True)
    employer_profile = EmployerProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "groups", "categories", "image_portfolio", "employer_profile", 
                  "phone_number", "first_name", "last_name", "national_code", "nationality",
                  "birth_date", "gender", "status", "work_status"]