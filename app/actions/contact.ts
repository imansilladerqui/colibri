"use server";

import { Resend } from "resend";

import {
  checkContactAntispam,
  verifyTurnstileToken,
} from "@/lib/contact-antispam";

export type ContactFormInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  formStartedAt?: number;
  turnstileToken?: string;
};

export type ContactActionError =
  | "not_configured"
  | "invalid"
  | "blocked"
  | "captcha_failed"
  | "testing_sender_restricted"
  | "send_failed";

export type ContactActionResult =
  | { success: true }
  | { success: false; error: ContactActionError };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendContactEmail = async (
  data: ContactFormInput,
): Promise<ContactActionResult> => {
  const name = data.name?.trim();
  const email = data.email?.trim();
  const message = data.message?.trim();

  if (!name || !email || !message || !emailPattern.test(email)) {
    return { success: false, error: "invalid" };
  }

  const antispam = checkContactAntispam({
    name,
    email,
    message,
    company: data.company,
    formStartedAt: data.formStartedAt,
    turnstileToken: data.turnstileToken,
  });

  if (!antispam.ok) {
    if (antispam.reason === "honeypot") {
      return { success: true };
    }
    if (antispam.reason === "captcha") {
      return { success: false, error: "captcha_failed" };
    }
    return { success: false, error: "blocked" };
  }

  if (process.env.TURNSTILE_SECRET_KEY?.trim()) {
    const captchaOk = await verifyTurnstileToken(data.turnstileToken);
    if (!captchaOk) {
      return { success: false, error: "captcha_failed" };
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "development") {
      const missing = [
        !apiKey && "RESEND_API_KEY",
        !to && "NEXT_PUBLIC_CONTACT_EMAIL",
        !from && "CONTACT_FROM_EMAIL",
      ].filter(Boolean);
      console.error("[sendContactEmail] Missing env:", missing.join(", "));
    }
    return { success: false, error: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Consulta de ${name} — Estudio Colibrí`,
    text: [`Nombre: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    console.error("[sendContactEmail]", error);
    const errorMessage = "message" in error ? String(error.message) : "";
    if (
      errorMessage.includes(
        "only send testing emails to your own email address",
      )
    ) {
      return { success: false, error: "testing_sender_restricted" };
    }
    return { success: false, error: "send_failed" };
  }

  return { success: true };
};
