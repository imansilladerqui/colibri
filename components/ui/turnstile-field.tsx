"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

type TurnstileFieldProps = {
  onToken: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
};

export const TurnstileField = ({
  onToken,
  onExpire,
  onError,
}: TurnstileFieldProps) => {
  const ref = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  if (!siteKey) {
    return null;
  }

  return (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      onSuccess={onToken}
      onExpire={() => {
        ref.current?.reset();
        onExpire();
      }}
      onError={() => {
        ref.current?.reset();
        onError();
      }}
      options={{ theme: "light", size: "flexible" }}
    />
  );
};
