from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import GroupSerializer


class MeRolesView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GroupSerializer

    def get_queryset(self):
        return self.request.user.groups.all()