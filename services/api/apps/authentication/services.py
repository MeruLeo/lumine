from django.utils.crypto import get_random_string
from .models import OTP, User
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache
from utils.exeption import TooManyRequestsError
from django_redis import get_redis_connection

# OTP_TIMEOUT = 120

# def get_cache__ttl(key):
#     try:
#         redis_conn = get_redis_connection("default")
#         ttl = redis_conn.ttl(key)
#         if ttl > 0:
#             return ttl
#     except Exception:
#         pass

#     return None

def generate_otp(phone):
    key = phone

    if cache.get(key):
        raise TooManyRequestsError
    
    code = get_random_string(allowed_chars="0123456789", length=6)
    cache.set(key, code, timeout=120)
    print(code)
    
    return code


def verify_otp(phone, code):
    stored_code = cache.get(phone)

    if stored_code != code:
        return False
    
    cache.delete(phone)
    user, created = User.objects.get_or_create(phone_number=phone)
    data = {
        "user": user,
        "created": created
    }
    return data


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }