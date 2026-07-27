from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import ProjectRequest, Project
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

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
            if instance.status == "accepted":
                return
            instance.status = "expired"
            instance.save(update_fields=["status"])
            return

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
            project=project,
        ).exclude(id=instance.id).update(
            status="expired"
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
        if (old_instance.moderation_status != "approved" and 
            instance.moderation_status == "approved" and 
            instance.status == "draft"):
            
            instance.status = "open"
            instance.expires_at = timezone.now() + timedelta(days=30)
    except Project.DoesNotExist:
        pass
