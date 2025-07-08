const categoryArray = [
  { key: "fashion", label: "مد و فشن" },
  { key: "sportswear_men", label: "لباس اسپورت مردانه" },
  { key: "sportswear_women", label: "لباس اسپورت زنانه" },
  { key: "formal_men", label: "لباس رسمی مردانه" },
  { key: "formal_women", label: "لباس رسمی زنانه" },
  { key: "casual", label: "لباس روزمره" },
  { key: "editorial", label: "ادیتوریال" },
  { key: "advertisement", label: "تبلیغاتی" },
  { key: "beauty", label: "زیبایی و آرایشی" },
  { key: "product", label: "عکاسی محصول" },
  { key: "lifestyle", label: "سبک زندگی" },
  { key: "lookbook", label: "لوک‌بوک برند" },
  { key: "streetwear", label: "لباس خیابانی" },
  { key: "underwear", label: "لباس زیر" },
  { key: "accessories", label: "اکسسوری" },
  { key: "runway", label: "شو زنده" },
  { key: "campaign", label: "کمپین برند" },
  { key: "ecommerce", label: "فروشگاه اینترنتی" },
  { key: "others", label: "سایر" },
] as const;

export const getCategoryLabel = (key?: string) => {
  return categoryArray.find((item) => item.key === key)?.label ?? "نامشخص";
};
