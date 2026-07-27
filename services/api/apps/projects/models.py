from django.db import models
from apps.authentication.models import User, Category
from django_jalali.db.models import jDateTimeField
from core.validators.dateValidator import date_validator
from apps.authentication.models import Province


class Project(models.Model):
    # فیلدهای کارفرمای پروژه و مدل پروژه
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="employer_projects")
    model = models.ForeignKey(User, on_delete=models.CASCADE, related_name="model_projects",
                              null=True, blank=True)
    
    # مسخصات پروژه
    province = models.ForeignKey(Province, on_delete=models.PROTECT, related_name="projects")
    name = models.CharField(max_length=255)
    description = models.TextField()
    budget = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="projects")
    start_date = models.CharField(max_length=10, validators=[date_validator])
    end_date = models.CharField(max_length=10, validators=[date_validator])
    # بررسی وضعیت توسط ادمین
    MODERATION_CHOICES = [
        ("pending", "درحال بررسی"),
        ("approved", "قبول شده"),
        ("rejected", "رد شده"),
    ]
    moderation_status = models.CharField(max_length=20, choices=MODERATION_CHOICES, default=MODERATION_CHOICES[0][0])

    # وضعیت چرخه حیات پروژه
    STATUS_CHOICES = [
        ("draft", "پیش نویس"),
        ("open", "باز"),
        ("in_progress", "در حال اجرا"),
        ("completed", "تکمیل شده"),
        ("closed", "بسته شده"),
        ("cancelled", "لغو شده"),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")

    expires_at = jDateTimeField(null=True, blank=True)

    # فیلدهای مستحب
    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['status', 'employer']),          
            models.Index(fields=['status', 'category']),          
            models.Index(fields=['status', 'model']),          
            models.Index(fields=['status', 'budget']),        
        ]
    

class ProjectRequest(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="requests") 
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_requests")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver_requests")

    CHOICE_STATUS = [
        ("pendding", "درانتظار"),
        ("accepted", "قبول شده"),
        ("rejected", "رد شده"),
        ("expired", "این پروژه را مدل دیگری برداشت")
    ]
    status = models.CharField(max_length=20, choices=CHOICE_STATUS, default=CHOICE_STATUS[0][0])

    created = jDateTimeField(auto_now_add=True)
    updated = jDateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.project.name} - {self.sender} -> {self.receiver}"
    
    class Meta:
        ordering = ['-created']
        indexes = [
            models.Index(fields=['sender']),
            models.Index(fields=['receiver']),
            models.Index(fields=['project']),
        ]
        unique_together = ['project', 'receiver', 'sender']