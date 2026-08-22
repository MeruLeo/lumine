from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import InstructorProfileSerializer


class MeInstructorProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = InstructorProfileSerializer

    def get_object(self):
        return self.request.user.instructor_profile