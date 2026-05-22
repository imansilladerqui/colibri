export type ContactAntispamInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  formStartedAt?: number;
  turnstileToken?: string;
};

export type AntispamRejectReason =
  | "honeypot"
  | "timing"
  | "content"
  | "captcha";

export type AntispamCheckResult =
  | { ok: true }
  | { ok: false; reason: AntispamRejectReason };

const MIN_FORM_MS = 2_500;
const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 4_000;
const MAX_LINKS = 8;

const linkPattern = /https?:\/\/|www\./gi;

export const checkContactAntispam = (
  input: ContactAntispamInput,
  now = Date.now(),
): AntispamCheckResult => {
  if (input.company?.trim()) {
    return { ok: false, reason: "honeypot" };
  }

  const startedAt = input.formStartedAt;
  if (typeof startedAt === "number" && now - startedAt < MIN_FORM_MS) {
    return { ok: false, reason: "timing" };
  }

  if (
    input.name.length > MAX_NAME_LENGTH ||
    input.message.length > MAX_MESSAGE_LENGTH ||
    (input.message.match(linkPattern)?.length ?? 0) > MAX_LINKS
  ) {
    return { ok: false, reason: "content" };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (secret && !input.turnstileToken?.trim()) {
    return { ok: false, reason: "captcha" };
  }

  return { ok: true };
};

export const verifyTurnstileToken = async (
  token: string | undefined,
): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  if (!token?.trim()) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
};
