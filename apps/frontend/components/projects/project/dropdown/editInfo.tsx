"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  DatePicker,
  Form,
} from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { parseDate } from "@internationalized/date";

import { useProject } from "@/hooks/useProject";

const editSchema = z.object({
  name: z.string().min(1, "نام پروژه اجباری است"),
  description: z.string().min(1, "توضیحات پروژه اجباری است"),
  category: z.string().min(1, "دسته‌بندی را انتخاب کنید"),
  budget: z
    .number({ invalid_type_error: "بودجه باید عدد باشد" })
    .positive("بودجه باید بیشتر از صفر باشد"),
  startDate: z.any(),
  endDate: z.any(),
});

type EditFormType = z.infer<typeof editSchema>;

interface EditProjectModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProjectModal({
  isOpen,
  onOpenChange,
}: EditProjectModalProps) {
  const { currentProject, updateProject } = useProject();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditFormType>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      budget: 0,
      startDate: undefined,
      endDate: undefined,
    },
  });

  useEffect(() => {
    if (currentProject) {
      const parsedStart = parseDate(currentProject.startDate.split("T")[0]);
      const parsedEnd = parseDate(currentProject.endDate.split("T")[0]);

      reset({
        name: currentProject.name,
        description: currentProject.description,
        category: currentProject.category,
        budget: currentProject.budget,
        startDate: parsedStart,
        endDate: parsedEnd,
      });

      setStartDate(parsedStart);
      setEndDate(parsedEnd);
    }
  }, [currentProject, isOpen]);

  const onSubmit = async (data: ProjectFormType) => {
    try {
      if (!startDate || !endDate) {
        console.log("لطفاً تاریخ شروع و پایان را انتخاب کنید");
        return;
      }

      const payload = {
        ...data,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };

      console.log(payload);

      await updateProject(currentProject._id, payload);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>ویرایش پروژه</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("name")}
                  label="نام"
                  size="sm"
                  radius="lg"
                  variant="faded"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Textarea
                  {...register("description")}
                  label="توضیحات"
                  size="sm"
                  radius="lg"
                  variant="faded"
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />

                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="دسته‌بندی"
                      radius="lg"
                      variant="faded"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!errors.category}
                      errorMessage={errors.category?.message}
                    >
                      {categoryArray.map((category) => (
                        <SelectItem key={category.key}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Input
                  {...register("budget", { valueAsNumber: true })}
                  label="بودجه"
                  type="number"
                  size="sm"
                  radius="lg"
                  variant="faded"
                  isInvalid={!!errors.budget}
                  errorMessage={errors.budget?.message}
                />

                <div className="flex w-full gap-1">
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <I18nProvider locale="fa-IR-u-ca-persian">
                        <DatePicker
                          label="تاریخ شروع"
                          radius="lg"
                          variant="faded"
                          value={field.value}
                          onChange={(val) => {
                            setStartDate(val);
                            field.onChange(val);
                          }}
                          isInvalid={!!errors.startDate}
                          errorMessage={`${errors.startDate?.message}`}
                        />
                      </I18nProvider>
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <I18nProvider locale="fa-IR-u-ca-persian">
                        <DatePicker
                          label="تاریخ پایان"
                          radius="lg"
                          variant="faded"
                          value={field.value}
                          onChange={(val) => {
                            setEndDate(val);
                            field.onChange(val);
                          }}
                          isInvalid={!!errors.endDate}
                          errorMessage={`${errors.endDate?.message}`}
                        />
                      </I18nProvider>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  radius="lg"
                  fullWidth
                  className="bg-Porcelain_White text-Jet_Black mt-4"
                >
                  ذخیره تغییرات
                </Button>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
