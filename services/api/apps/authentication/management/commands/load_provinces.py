from django.core.management.base import BaseCommand
from django.db import transaction
from ...models import Province


class Command(BaseCommand):
    help = 'بارگذاری تمامی استان‌های ایران در جدول Province'

    def handle(self, *args, **options):
        provinces = [
            "آذربایجان شرقی",
            "آذربایجان غربی",
            "اردبیل",
            "اصفهان",
            "البرز",
            "ایلام",
            "بوشهر",
            "تهران",
            "خراسان رضوی",
            "خراسان جنوبی",
            "خراسان شمالی",
            "خوزستان",
            "زنجان",
            "چهارمحال‌ و بختیاری"
            "سمنان",
            "سیستان و بلوچستان",
            "فارس",
            "قزوین",
            "قم",
            "کردستان",
            "کرمان",
            "کرمانشاه",
            "کهگیلویه و بویراحمد",
            "گلستان",
            "گیلان",
            "لرستان",
            "مازندران",
            "مرکزی",
            "هرمزگان",
            "همدان",
            "یزد",
        ]

        created_count = 0
        updated_count = 0

        with transaction.atomic():
            for name in provinces:
                # ایجاد slug (اختیاری اما خیلی مفید)
                slug = name.replace(" ", "-").replace("‌", "-").lower()
                
                obj, created = Province.objects.update_or_create(
                    name=name,
                    defaults={
                        'slug': slug,
                    }
                )
                
                if created:
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f'✓ استان اضافه شد: {name}'))
                else:
                    updated_count += 1
                    self.stdout.write(self.style.WARNING(f'→ استان بروزرسانی شد: {name}'))

        self.stdout.write(self.style.SUCCESS(
            f'\nعملیات با موفقیت انجام شد!\n'
            f'تعداد استان‌های جدید: {created_count}\n'
            f'تعداد بروزرسانی شده: {updated_count}\n'
            f'مجموع استان‌ها: {Province.objects.count()}'
        ))