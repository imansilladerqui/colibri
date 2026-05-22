import { sendGTMEvent } from "@next/third-parties/google";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";

export const isGtmEnabled = () => Boolean(GTM_ID);

export const GTM_EVENTS = {
  PAGE_VIEW: "page_view",
  SECTION_VIEW: "section_view",
  SCROLL_DEPTH: "scroll_depth",
  NAVIGATION_CLICK: "navigation_click",
  CTA_CLICK: "cta_click",
  CONTACT_FORM_START: "contact_form_start",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CONTACT_FORM_SUCCESS: "contact_form_success",
  CONTACT_FORM_ERROR: "contact_form_error",
  OUTBOUND_CLICK: "outbound_click",
  MENU_TOGGLE: "menu_toggle",
  LOGO_CLICK: "logo_click",
} as const;

export type GtmEventName = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];

export type GtmLocation =
  | "header"
  | "header_mobile"
  | "footer"
  | "hero"
  | "contact";

export type GtmEventPayload = {
  event: GtmEventName | string;
  [key: string]: string | number | boolean | undefined;
};

export const pushGtmEvent = (payload: GtmEventPayload) => {
  if (!isGtmEnabled()) return;
  sendGTMEvent(payload);
};

export const getPageContext = () => {
  if (typeof window === "undefined") {
    return {
      page_path: "/",
      page_location: "",
      page_title: "",
    };
  }

  return {
    page_path: `${window.location.pathname}${window.location.hash || ""}`,
    page_location: window.location.href,
    page_title: document.title,
  };
};

export const trackPageView = (overrides?: Partial<ReturnType<typeof getPageContext>>) => {
  pushGtmEvent({
    event: GTM_EVENTS.PAGE_VIEW,
    ...getPageContext(),
    ...overrides,
  });
};

export const trackSectionView = (sectionId: string, sectionName: string) => {
  pushGtmEvent({
    event: GTM_EVENTS.SECTION_VIEW,
    section_id: sectionId,
    section_name: sectionName,
    ...getPageContext(),
  });
};

export const trackScrollDepth = (percent: number) => {
  pushGtmEvent({
    event: GTM_EVENTS.SCROLL_DEPTH,
    scroll_depth: percent,
    ...getPageContext(),
  });
};

export const trackNavigationClick = ({
  linkText,
  linkUrl,
  location,
}: {
  linkText: string;
  linkUrl: string;
  location: GtmLocation;
}) => {
  pushGtmEvent({
    event: GTM_EVENTS.NAVIGATION_CLICK,
    link_text: linkText,
    link_url: linkUrl,
    link_location: location,
    ...getPageContext(),
  });
};

export const trackCtaClick = ({
  ctaName,
  location,
  destination,
}: {
  ctaName: string;
  location: GtmLocation;
  destination?: string;
}) => {
  pushGtmEvent({
    event: GTM_EVENTS.CTA_CLICK,
    cta_name: ctaName,
    cta_location: location,
    cta_destination: destination,
    ...getPageContext(),
  });
};

export const trackContactFormStart = () => {
  pushGtmEvent({
    event: GTM_EVENTS.CONTACT_FORM_START,
    form_name: "contact",
    ...getPageContext(),
  });
};

export const trackContactFormSubmit = () => {
  pushGtmEvent({
    event: GTM_EVENTS.CONTACT_FORM_SUBMIT,
    form_name: "contact",
    ...getPageContext(),
  });
};

export const trackContactFormSuccess = () => {
  pushGtmEvent({
    event: GTM_EVENTS.CONTACT_FORM_SUCCESS,
    form_name: "contact",
    ...getPageContext(),
  });
};

export const trackContactFormError = (errorType: string) => {
  pushGtmEvent({
    event: GTM_EVENTS.CONTACT_FORM_ERROR,
    form_name: "contact",
    error_type: errorType,
    ...getPageContext(),
  });
};

export const trackOutboundClick = ({
  linkUrl,
  linkText,
  location,
}: {
  linkUrl: string;
  linkText: string;
  location: GtmLocation | "contact";
}) => {
  pushGtmEvent({
    event: GTM_EVENTS.OUTBOUND_CLICK,
    link_url: linkUrl,
    link_text: linkText,
    link_location: location,
    ...getPageContext(),
  });
};

export const trackMenuToggle = (open: boolean) => {
  pushGtmEvent({
    event: GTM_EVENTS.MENU_TOGGLE,
    menu_state: open ? "open" : "close",
    ...getPageContext(),
  });
};

export const trackLogoClick = (location: GtmLocation) => {
  pushGtmEvent({
    event: GTM_EVENTS.LOGO_CLICK,
    link_location: location,
    ...getPageContext(),
  });
};

export const SECTION_LABELS: Record<string, string> = {
  inicio: "Inicio",
  estudio: "Estudio",
  proyectos: "Proyectos",
  servicios: "Servicios",
  contacto: "Contacto",
};

export const TRACKED_SECTION_IDS = Object.keys(SECTION_LABELS);
