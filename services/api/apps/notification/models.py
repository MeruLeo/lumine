from django.db import models
from apps.authentication.models import User, Category
from django_jalali.db.models import jDateTimeField


class Notification(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()

    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notification_send", null=True, blank=True)

    CHOICES_TYPE_SENDER = [
        ("lumine", "لومینه"),
        ("user", "کاربر"), 
    ]
    type_sender = models.CharField(max_length=25, choices=CHOICES_TYPE_SENDER, null=True, blank=True)

    CHOICES_TYPE_NOTIF = [
        ("success", "موفق"),
        ("warning", "ناموفق"),
        ("info", "اطلاعات"),
    ]
    type_notif = models.CharField(max_length=25, choices=CHOICES_TYPE_NOTIF, null=True, blank=True)

    is_global = models.BooleanField(default=False)

    created_at = jDateTimeField(auto_now_add=True)
    expired_at = jDateTimeField(null=True, blank=True)

    # ------------------
    # Target
    # ------------------
    role = models.CharField(max_length=25, choices=[
        ("model", "مدل"),
        ("employer", "کارفرما"),
        ("instructor", "مدرس"),
    ], null=True, blank=True)

    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    def __str__(self):
        return self.title
    

class NotificationRecipient(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name="recipient")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")

    is_seen = models.BooleanField(default=False)

    seen_at = jDateTimeField(null=True, blank=True)

    created = jDateTimeField(auto_now_add=True)

    def __str__(self):
        return self.receiver.first_name