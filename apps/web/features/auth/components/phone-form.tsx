"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { auth_1FieldConfigPhone } from "../configs/auth_1";
import { Auth_1PhoneType, auth_1SchemaPhone } from "../schemas/auth_1";
import { Button, Description, Surface } from "@heroui/react";
import { useSendPhoneOtp } from "../hooks/mutations/use-send-phone-otp";

export const PhoneForm = () => {
  const { mutate, isPending } = useSendPhoneOtp();

  const onSubmit = (data: Auth_1PhoneType) => {
    mutate({
      phone_number: data.phone_number,
    });
  };

  return (
    <Surface variant="transparent" className="w-sm p-4">
      <h3 className="text-3xl font-bold mt-1 mb-4">به لومینه خوش اومدی</h3>
      <Description className="text-lg text-text-secondary-dark">
        ورود یا ثبت نام
      </Description>
      <FormBuilder
        fields={auth_1FieldConfigPhone}
        onSubmit={onSubmit}
        schema={auth_1SchemaPhone}
        submitButtonText="ارسال کد تایید"
      />
      <p className="text-sm text-text-tertiary-light my-2 text-right">
        ورود و ثبت‌نام در لومینه به معنای پذیرش شرایط و مقررات و قوانین حریم
        خصوصی است.
      </p>
    </Surface>
  );
};
