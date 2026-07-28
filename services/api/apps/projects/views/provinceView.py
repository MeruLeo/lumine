from rest_framework.generics import ListAPIView
from ..serializer.provinceSerializer import ProvinceSerializer
from rest_framework.permissions import IsAuthenticated
from apps.authentication.models import Province
from core.apiResponse.apiResponse import ApiResponse


class ProvinceView(ListAPIView):
    serializer_class = ProvinceSerializer
    permission_classes = [IsAuthenticated]
    queryset = Province.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True) 
        return ApiResponse.success(
            message="لیست استان ها با موفقیت گرفته شد",
            data=serializer.data
        )
    
        