from rest_framework.viewsets import ReadOnlyModelViewSet
from ..serializers.modelSerializer import ModelSerializer
from ..serializers.employerSerializer import EmployerSerializer
from rest_framework.permissions import IsAuthenticated
from apps.authentication.models import User


class GetModelView(ReadOnlyModelViewSet):
    serializer_class = ModelSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(groups__name="model").distinct()


class GetEmployerView(ReadOnlyModelViewSet):
    serializer_class = EmployerSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(groups__name="employer").distinct()