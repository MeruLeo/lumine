from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import EmployerProfileSerializer


class MeEmployerProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmployerProfileSerializer

    def get_object(self):
        return self.request.user.employer_profile