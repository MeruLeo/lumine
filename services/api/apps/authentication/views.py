from .models import *
from rest_framework import generics, views
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from .services import *
from core.apiResponse.apiResponse import ApiResponse
from django.contrib.auth.models import Group
from utils.encryption import encrypt_user_id
from utils.mixin import TokenUserMixin


class SendOtp(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone_number = serializer.validated_data['phone_number']
        try:
            code = generate_otp(phone_number)

        except TooManyRequestsError:
            return ApiResponse.error(
                message="لطفاً تا ۱۲۰ ثانیه دیگر دوباره تلاش کنید.",
                errors={
                    "code": "OTP_WAIT_TIME",
                    "retry_after": 120
                },
                status_code=429
            )
        
        except Exception:
            return ApiResponse.error(
                message="خطایی در ارسال کد تأیید رخ داد. لطفاً دوباره تلاش کنید.",
                errors={
                    "code": "OTP_SEND_FAILED"
                },
                status_code=500
            )

        return ApiResponse.success(
            message="کد تأیید با موفقیت ارسال شد.",
            data={
                "phone_number": phone_number,
                "expired_OTP": 120,
            },
            status_code=200
        )


class VerifyOtp(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = VerifyOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        code = serializer.validated_data['code']

        verify = verify_otp(phone_number, code)
        
        user = User.objects.get(phone_number=phone_number)

        if verify:
            if user.step_reg == 6:
                if user.status == "accept":
                    tokens = get_tokens_for_user(user)

                    return ApiResponse.success(
                        message=".خوش آمدید",
                        data={
                            "step_registeration": user.step_reg,
                            "status": user.status,
                            "tokens": tokens
                        }
                    )
                else:
                    return ApiResponse.success(
                        message="درخواست شما در حال بررسی است.",
                        data={
                            "step_registeration": user.step_reg,
                            "status": user.status,
                            "text_error": user.text_error
                        }
                    )
            
            else:
                if verify['created']:
                    user.step_reg = 1
                    user.save()

                return ApiResponse.success(
                    message="لطفا ادامه مراحل ثبت‌نام را تکمیل کنید.",
                    data={
                        "user_token": encrypt_user_id(user.id),
                        "step_registeration": user.step_reg,
                    }
                )

        return ApiResponse.error(
            message="کد تایید صحیح نیست!",
            errors={
                "otp": "Invalid verification code"
            }
        )
    

# نمونه درخواست:
# {
#   "first_name": "",
#   "last_name": "",
#   "national_code": "",
#   "nationality": "",
#   "gender": "",
#   "birth_date": ""
# }
class BasicInfo(generics.UpdateAPIView, TokenUserMixin):
    serializer_class = BasicInfoSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.token_user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.step_reg == 1:
            partial = kwargs.pop('partial', False)
            

            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            instance.step_reg = 2
            instance.save()

            return ApiResponse.success(
                message="اطلاعات پایه با موفقیت ثبت شد.",
                data=serializer.data
            )
        else:
            return ApiResponse.error(
                message="لطفا شماره خود را تایید کنید.",
            )
    

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    

class SetUserRole(views.APIView, TokenUserMixin):
    permission_classes = [AllowAny]
    def get_object(self):
        return self.token_user


    def post(self, request):
        user = self.get_object()
        if user.step_reg == 2:
            serializer = SetUserRoleSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            role_name = serializer.validated_data["role"]
            
            role_group = Group.objects.get(name=role_name)


            user.groups.add(role_group)
            user.step_reg = 3
            user.save()
            return ApiResponse.success(
                message="نقش کاربر با موفقیت ثبت شد",
                data={
                    "user_id": user.id,
                    "roles_name": list(user.groups.values_list("name", flat=True)),
                }
            )
        else:
            return ApiResponse.error(
                message="متاسفانه شما دسترسی کافی را ندارید",
            )
    

class GetCategories(generics.ListAPIView):
    serializer_class = CategoreisSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        type = self.request.headers.get('type')
        queryset = Category.objects.filter(type=type)
        return queryset
    

class PrimaryCategoryAPIView(views.APIView, TokenUserMixin):
    permission_classes = [AllowAny]


    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [AllowAny()]

    def get(self, request):
        user = request.user
        
        try:
            primary_category = UserCategory.objects.filter(
                user=user, 
                primary=True
            ).select_related('category').first()  

            data = {
                "id": primary_category.category.id,
                "name": primary_category.category.name,
                "name_persian": primary_category.category.persion_name
            }

            return ApiResponse.success(
                message="fetch primary category successfully",
                data=data
            )

        except:
            return ApiResponse.error(
                message="primary category",
                errors={
                    "category_id": "User is not have primary category"
                }
            )
        
    def get_object(self):
        return self.token_user

    def post(self, request):
        user = self.get_object()
        if user.step_reg == 3:
            serializer = PrimaryCategorySerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            category_id = serializer.validated_data['category_id']
            category = Category.objects.get(id=category_id)

            UserCategory.objects.filter(user=user, primary=True).update(primary=False)

            user_category, created = UserCategory.objects.update_or_create(
                user=user,
                category=category,
                defaults={"primary": True}
            )

            if created:
                user.step_reg = 4
                user.save()

            data = {
                "id": category.id,
                "name": category.name,
                "name_persian": category.persion_name,
                "role_user": user.groups.first().name
            }

            return ApiResponse.success(
                message="Set primary category successfully",
                data=data
            )
        else:
            return ApiResponse.error(
                message="شما دسترسی کافی را ندارید"
            )
    
# {
#   "height_cm": 170,
#   "weight_kg": 65,
#   "skin_color": "light",
#   "eye_color": "black",
#   "hair_color": "brown"
# }
class TechnicalInfoAPIView(views.APIView, TokenUserMixin):
    permission_classes = [AllowAny]

    def get_user(self):
        return self.token_user

    def post(self, request):
        user = self.get_user()
        if user.step_reg == 4 and user.groups.filter(name="model"):
            if hasattr(user, "technical_info"):
                return ApiResponse.error(
                    message="Thecnical Info already exists"
                )

            serializer = TechnicalInfoSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)

            user.step_reg = 5
            user.save()

            return ApiResponse.success(
                message="Thechnical info created successfully",
                data=serializer.data
            )
        else:
            return ApiResponse.error(
                message="متاسفانه دسترسی کافی را ندارید",
            )
    
# {
#   "company_type": "company",
#   "company_name": "شرکت اجی بل بل",
#   "email": "heidari@gmail.com",
#   "instagram": "",
#   "website": "",
#   "city": "Isfahan",
#   "address": "اصفهان نجف اباد بلوار ازادگان",
#   "description": ""
# }
class EmployerProfileAPIView(views.APIView, TokenUserMixin):
    permission_classes = [AllowAny]
    def get_user(self):
        return self.token_user

    def post(self, request):
        user = self.get_user()
        if user.step_reg == 4 and user.groups.filter(name="employer"):
            if hasattr(user, "employer_profile"):
                return ApiResponse.error(
                    message="Employer profile already exists"
                )

            serializer = EmployerProfileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)

            user.step_reg = 5
            user.save()

            return ApiResponse.success(
                message="Employer profile created successfully",
                data=serializer.data
            )
        else:
            return ApiResponse.error(
                message="شما دسترسی کافی را ندارید",
            )


class InstructorProfileAPIView(views.APIView, TokenUserMixin):
    permission_classes = [AllowAny]
    def get_user(self):
        return self.token_user

    def post(self, request):
        user = self.get_user()
        if user.step_reg == 4 and user.groups.filter(name="instructor"):
            if hasattr(user, "instructor_profile"):
                return ApiResponse.error(
                    message="Employer profile already exists"
                )

            serializer = InstructorProfileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)

            user.step_reg = 5
            user.save()

            return ApiResponse.success(
                message="Employer profile created successfully",
                data=serializer.data
            )
        else:
            return ApiResponse.error(
                message="شما دسترسی کافی را ندارید",
            )