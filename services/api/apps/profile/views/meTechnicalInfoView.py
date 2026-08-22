from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import TechnicalInfoSerializer


class MeThecnicalInfoView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TechnicalInfoSerializer

    def get_object(self):
        return self.request.user.technical_info