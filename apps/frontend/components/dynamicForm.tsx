"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodTypeAny, ZodObject } from "zod";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@heroui/switch";
import clsx from "clsx";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { Select, SelectItem } from "@heroui/select";
import { Divider } from "@heroui/divider";
import { Textarea } from "@heroui/react";

export type FieldType = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "checkbox"
    | "date"
    | "number"
    | "otp";
  options?: { label: string; value: string }[];
  validation: ZodTypeAny;
  defaultValue?: any;
};

type DynamicFormProps = {
  fields: FieldType[];
  onSubmit: (data: any) => void;
  submitLabel?: string;
};

export const DynamicForm = ({
  fields,
  onSubmit,
  submitLabel = "ثبت فرم",
}: DynamicFormProps) => {
  const schemaShape = fields.reduce(
    (acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    },
    {} as Record<string, ZodTypeAny>,
  );

  const formSchema: ZodObject<any> = z.object(schemaShape);

  const defaultValues = fields.reduce(
    (acc, field) => {
      acc[field.name] =
        field.defaultValue ?? (field.type === "checkbox" ? false : "");
      return acc;
    },
    {} as Record<string, any>,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const otpValue = watch("otp");
  const isOtpComplete = otpValue && otpValue.length === 6;

  const isTwoColumnLayout = fields.length > 3;

  return (
    <form
      className={clsx(
        "w-full max-w-xl gap-4 flex flex-col items-center justify-between",
        isTwoColumnLayout ? "grid grid-cols-2" : "flex flex-col",
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field) => {
        const error = errors[field.name]?.message as string | undefined;

        switch (field.type) {
          case "textarea":
            return (
              <div key={field.name}>
                <Textarea
                  {...register(field.name)}
                  className="w-full rounded-md px-3 py-2 text-sm"
                  placeholder={field.placeholder}
                  label={field.label}
                  variant="bordered"
                />
                {field.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {field.description}
                  </p>
                )}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          case "select":
            return (
              <div key={field.name}>
                {/* <label className="block text-sm my-4 font-medium mb-1">
                  {field.label}
                </label> */}

                <Select
                  selectedKeys={watch(field.name)}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0]; // چون keys یه Set هست
                    setValue(field.name, value);
                  }}
                  className="w-full"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder={field.placeholder || "انتخاب کنید"}
                  aria-label={field.label}
                  label={field.label}
                >
                  {(field.options || []).map((opt) => {
                    const option =
                      typeof opt === "string"
                        ? { label: opt, value: opt }
                        : opt;

                    return (
                      <SelectItem key={option.value}>{option.label}</SelectItem>
                    );
                  })}
                </Select>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          case "checkbox":
            return (
              <div key={field.name} className="flex my-4 items-center gap-2">
                <Switch
                  checked={!!watch(field.name)}
                  onChange={(val) => setValue(field.name, !!val)}
                  className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full",
                    watch(field.name) ? "bg-blue-600" : "bg-gray-300",
                  )}
                >
                  <span className="sr-only">{field.label}</span>
                  <span
                    className={clsx(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition",
                      watch(field.name) ? "translate-x-6" : "translate-x-1",
                    )}
                  />
                </Switch>
                <span className="text-sm">{field.label}</span>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            );

          case "otp":
            return (
              <div key={field.name}>
                <InputOtp
                  dir="ltr"
                  length={6}
                  {...register(field.name)}
                  errorMessage={`لطفا شش عدد وارد کنید`}
                  label={field.label}
                />
                {field.description && (
                  <p className="text-xs my-4 text-Jet_Black_3 mt-1">
                    {field.description}
                  </p>
                )}
              </div>
            );

          case "number":
            return (
              <div key={field.name} className="my-4">
                <Input
                  type="number"
                  {...register(field.name, {
                    valueAsNumber: true,
                  })}
                  className="my-2"
                  color={error ? "danger" : "default"}
                  label={error || field.label}
                  radius="lg"
                  size="sm"
                  variant={error ? "flat" : "faded"}
                />
              </div>
            );

          default:
            return (
              <div key={field.name} className="w-full">
                <Input
                  className=" w-full"
                  type={field.type}
                  {...register(field.name)}
                  color={error ? "danger" : "default"}
                  label={error ? error : field.label}
                  radius="lg"
                  size="sm"
                  variant={error ? "flat" : "faded"}
                  value={field.defaultValue && field.defaultValue}
                />
                {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
              </div>
            );
        }
      })}
      <Button
        className={clsx(
          "bg-Porcelain_White text-Jet_Black",
          isTwoColumnLayout && "col-span-2",
        )}
        type="submit"
        fullWidth
      >
        {submitLabel}
      </Button>
    </form>
  );
};
