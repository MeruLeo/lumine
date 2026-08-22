from ..models import ImagePortfolio, User
from core.apiResponse.apiResponse import ApiResponse
from rest_framework import views
from rest_framework.parsers import MultiPartParser, FormParser
from ..serializers1.ImagePortfolioSerializer import ImagePortfolioSerializer
from utils.encryption import decrypt_user_id
from rest_framework.permissions import AllowAny

class ImagePortfolioAPIView(views.APIView):
    permission_classes = [AllowAny]

    parser_classes = [MultiPartParser, FormParser]

    def get_user(self):
        user_id = decrypt_user_id(self.request.headers.get('token'))
        user = User.objects.get(id=user_id)
        return user

    def post(self, request):
        user = self.get_user()
        if user.step_reg == 5:

            if hasattr(user, "images_portfolio"):
                return ApiResponse.error(
                    message="portfolio allready exists"
                )
            
            serializer = ImagePortfolioSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            serializer.save(user=user)

            user.step_reg = 6
            user.save()

            return ApiResponse.success(
                message="portfolio created successfully",
                data=serializer.data
            )
        else:
            return ApiResponse.success(
                message="شما دسترسی کافی را ندارید",
            )
    

    
    