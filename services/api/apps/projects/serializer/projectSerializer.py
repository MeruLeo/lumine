from rest_framework import serializers
from ..models import Project
from apps.authentication.models import Category, User, Province

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "persion_name", "type"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ["id", "name", "slug"]


class ProjectSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        source="category",
        queryset=Category.objects.all(),
        write_only=True 
    )
    employer = UserSerializer(read_only=True)
    model = UserSerializer(read_only=True)
    province = ProvinceSerializer(read_only=True)

    province_id = serializers.PrimaryKeyRelatedField(
        source="province",
        queryset=Province.objects.all(),
        write_only=True 
    )
    class Meta:
        model = Project
        fields = '__all__' 
        read_only_fields = ['employer', ]