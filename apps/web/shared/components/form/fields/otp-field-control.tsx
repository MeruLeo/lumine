"use client";

import { Controller } from "react-hook-form";
import { Button, Description, InputOTP, Label, TextField } from "@heroui/react";
import { useOtpTimer } from "@/shared/hooks/otp-timer";
import { useAuthStore } from "@/features/auth/store/auth_1";

export function OTPField({ field, control }: any) {
  const length = field.maxLength ?? 6;

  const otpExpire = useAuthStore((s) => s.registration.otpExpire);

  const { formatted, isExpired, reset } = useOtpTimer(otpExpire ?? 0);

  return (
    <div>
      <Controller
        name={field.name}
        control={control}
        render={({ field: rhf, fieldState }) => (
          <TextField
            fullWidth
            isRequired={field.required}
            isInvalid={!!fieldState.error}
            dir="ltr"
          >
            <Label>{field.label}</Label>

            <InputOTP
              variant="secondary"
              className={field.className}
              maxLength={length}
              value={rhf.value ?? ""}
              onChange={(value) => {
                const numeric = value.replace(/\D/g, "");
                rhf.onChange(numeric);

                if (numeric.length === length) {
                  field.onComplete?.(numeric);
                }
              }}
            >
              <InputOTP.Group>
                {Array.from({ length }).map((_, i) => (
                  <InputOTP.Slot key={i} index={i} />
                ))}
              </InputOTP.Group>
            </InputOTP>
          </TextField>
        )}
      />

      <Description className="flex p-2 justify-center items-center">
        دریافت نکردید ؟
        {!isExpired ? (
          <p className="m-2">{formatted}</p>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            className="m-2"
            onPress={() => {
              reset();
              field.onResend?.();
            }}
          >
            ارسال مجدد
          </Button>
        )}
      </Description>
    </div>
  );
}
