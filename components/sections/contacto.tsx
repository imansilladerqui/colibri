"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Mail, MapPin } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import {
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSubmit,
  trackContactFormSuccess,
  trackOutboundClick,
} from "@/lib/analytics/gtm";
import { CONTACTO, SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { TurnstileField } from "@/components/ui/turnstile-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  company: string;
};

const turnstileEnabled = Boolean(
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
);

export const Contacto = () => {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formStartedAt = useRef(0);
  const formStartTracked = useRef(false);

  useLayoutEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const submitContactForm = async ({ company, ...data }: ContactFormValues) => {
    if (turnstileEnabled && !turnstileToken) {
      setStatus("error");
      setStatusMessage(CONTACTO.form.errorCaptcha);
      trackContactFormError("captcha_required");
      return;
    }

    setStatus("sending");
    setStatusMessage(null);
    trackContactFormSubmit();

    const result = await sendContactEmail({
      ...data,
      company,
      formStartedAt: formStartedAt.current,
      turnstileToken: turnstileToken ?? undefined,
    });

    if (result.success) {
      setStatus("success");
      setStatusMessage(CONTACTO.form.success);
      trackContactFormSuccess();
      reset();
      setTurnstileToken(null);
      return;
    }

    setStatus("error");
    trackContactFormError(result.error);
    const messages = {
      not_configured: CONTACTO.form.errorNotConfigured,
      invalid: CONTACTO.form.errorInvalid,
      blocked: CONTACTO.form.errorSend,
      captcha_failed: CONTACTO.form.errorCaptcha,
      testing_sender_restricted: CONTACTO.form.errorTestingSender,
      send_failed: CONTACTO.form.errorSend,
    };
    setStatusMessage(messages[result.error]);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(submitContactForm)(event);
  };

  return (
    <section
      id="contacto"
      className="bg-surface border-border border-t py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading label={CONTACTO.label} title={CONTACTO.heading} />

        <motion.p
          className="text-muted -mt-8 mb-12 max-w-2xl text-lg"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          {CONTACTO.intro}
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="gradient-border space-y-6 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="border-border bg-background/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                  <Mail className="text-teal h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted text-sm">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-foreground hover:text-accent font-medium transition-colors"
                    onClick={() =>
                      trackOutboundClick({
                        linkUrl: `mailto:${SITE.email}`,
                        linkText: SITE.email,
                        location: "contact",
                      })
                    }
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="border-border bg-background/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                  <MapPin className="text-teal h-5 w-5" />
                </div>
                <div>
                  <p className="text-muted text-sm">Ubicación</p>
                  <p className="text-foreground font-medium">{SITE.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="gradient-border flex min-h-[320px] flex-col items-center justify-center rounded-2xl p-12 text-center">
                <p className="font-display text-foreground text-2xl font-semibold">
                  Mensaje enviado
                </p>
                <p className="text-muted mt-4 max-w-sm">{statusMessage}</p>
              </div>
            ) : (
              <form
                onSubmit={onFormSubmit}
                onFocusCapture={() => {
                  if (formStartTracked.current) return;
                  formStartTracked.current = true;
                  trackContactFormStart();
                }}
                className="gradient-border relative space-y-6 rounded-2xl p-8"
                noValidate
              >
                <div className="space-y-2">
                  <Label htmlFor="contact-name">{CONTACTO.form.name}</Label>
                  <Input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(errors.name)}
                    {...register("name", {
                      required: CONTACTO.form.nameRequired,
                    })}
                  />
                  {errors.name && (
                    <p className="text-accent text-xs">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">{CONTACTO.form.email}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(errors.email)}
                    {...register("email", {
                      required: CONTACTO.form.emailRequired,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: CONTACTO.form.emailInvalid,
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-accent text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                  {...register("company")}
                />

                <div className="space-y-2">
                  <Label htmlFor="contact-message">
                    {CONTACTO.form.message}
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto..."
                    className="min-h-[160px]"
                    disabled={status === "sending"}
                    aria-invalid={Boolean(errors.message)}
                    {...register("message", {
                      required: CONTACTO.form.messageRequired,
                    })}
                  />
                  {errors.message && (
                    <p className="text-accent text-xs">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {turnstileEnabled && (
                  <TurnstileField
                    onToken={setTurnstileToken}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                  />
                )}

                {statusMessage && status === "error" && (
                  <p role="status" className="text-accent text-sm">
                    {statusMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="gap-2"
                >
                  {status === "sending" && (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  )}
                  {status === "sending"
                    ? CONTACTO.form.sending
                    : CONTACTO.form.send}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
