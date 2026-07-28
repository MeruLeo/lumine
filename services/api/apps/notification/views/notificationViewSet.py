from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from core.permissions.IsOwnerOrAdminPermission import IsOwnerOrAdmin
from ..serializers.notificationSerializer import NotificationSerializer
from core.apiResponse.apiResponse import ApiResponse
from ..models import Notification, NotificationRecipient


class NotificationView(ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Notification.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(sender=request.user)

        return ApiResponse.success(
            message="create notification successfully",
            data=serializer.data
        )
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return ApiResponse.success(
        #         message="نوتیف های شما با موفقیت گرفته شد",
        #         data=serializer.data
        #     )
        
        serializer = self.get_serializer(queryset, many=True)
        return ApiResponse.success(
                message="نوتیف های شما با موفقیت گرفته شد",
                data=serializer.data
        )
    
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()

        serializer = self.get_serializer(obj)

        return ApiResponse.success(
            message="نوتیف شما با موفقیت گرفته شد",
            data=serializer.data
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False) 
        obj = self.get_object()

        serializer = self.get_serializer(obj, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return ApiResponse.success(
            message="نوتیف شما با موفقیت آپدیت شد",
            data=serializer.data
        )
    
    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        notif_id = obj.id
        notif_title = obj.title
        notif_message = obj.message

        obj.delete()

        return ApiResponse.success(
            message='نوتیف شما با موفقیت حذف شد',
            data={
                "id": notif_id,
                "title": notif_title,
                "message": notif_message,
            }
        )
