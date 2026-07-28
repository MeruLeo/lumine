from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import ProjectRequest, Project
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from apps.notification.models import Notification
from core.apiResponse.apiResponse import ApiResponse

@receiver(post_save, sender=ProjectRequest)
def update_project_model_on_accept(sender, instance, created, **kwargs):
    if instance.status != "accepted":
        return

    # تراکنش اتمیک برای جلوگیری از race conditions
    with transaction.atomic():
        # قفل رکورد پروژه تا تمام عملیات داخل همین بلاک انجام شود
        project = Project.objects.select_for_update().get(id=instance.project.id)

        # بررسی اینکه آیا پروژه قبلا توسط مدل دیگری گرفته شده
        if project.model:
            # اگر قبلاً مدل داشته، وضعیت درخواست فعلی باید به expired تغییر کند
            instance.status = "expired"
            instance.save(update_fields=["status"])
            return ApiResponse.error(
                message="این پروژه توسط مدل دیگری در حال انجام است"
            )

        # تعیین مدل پروژه بر اساس سمت درخواست
        if instance.sender.groups.filter(name="employer").exists():
            selected_model = instance.receiver
        else:
            selected_model = instance.sender

        # تنظیم فیلدها
        project.model = selected_model
        project.status = "in_progress"
        project.save(update_fields=["model", "status"])

        # بروزرسانی سایر درخواست‌های در انتظار برای همین پروژه
        ProjectRequest.objects.filter(
            project=project, status="pendding"
        ).exclude(id=instance.id).update(
            status="expired"
        )

        project_reqs = ProjectRequest.objects.filter(project=project, status="expired")
        for req in project_reqs:
            Notification.objects.create(
                title=f"پروژه {req.project.name} را مدل دیگری برداشت",
                message=f"امیدوارم به پروژه های بعدی برسی عزیزم",
                type_sender="lumine",
                type_notif="info",
                user=req.sender
            )


@receiver(pre_save, sender=Project)
def set_open_status_on_approval(sender, instance, **kwargs):
    """
    قبل از ذخیره، چک کن اگر moderation_status به approved تغییر کرد، 
    status را هم به open ست کن
    """
    if not instance.pk:  # پروژه جدید
        return

    try:
        old_instance = Project.objects.get(pk=instance.pk)
        user = instance.employer
        if (old_instance.moderation_status != "approved" and 
            instance.moderation_status == "approved" and 
            instance.status == "draft"):
            
            instance.status = "open"
            instance.expires_at = timezone.now() + timedelta(days=30)

            Notification.objects.create(
                title=f"{instance.name} تایید شد",
                message="پروژه شما با موفقیت از طرف سیستم لومینه تایید و در حالت باز قرار گرفت",
                type_sender="lumine",
                type_notif="success",
                user=user
            )
        elif (old_instance.moderation_status != "rejected" and
              instance.moderation_status == "rejected" and
              instance.status == "draft"):

            instance.status = "cancelled"

            Notification.objects.create(
                title=f"{instance.name} رد شد",
                message="متاسفانه پروژه شما رد شد برای اطلاعات بیشتر به پشتیبانی مراجعه فرمایید",
                type_sender="lumine",
                type_notif="warning",
                user=user
            )
            
    except Project.DoesNotExist:
        pass
