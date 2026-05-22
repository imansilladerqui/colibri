import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Car,
  Compass,
  Layers,
  LayoutDashboard,
  LineChart,
  Palette,
  Hotel,
  Rocket,
  Ship,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react";

export const SITE = {
  name: "Estudio Colibrí",
  shortName: "Colibrí",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@estudiocolibri.es",
  phone: "+34 600 000 000",
  location: "Barcelona, España",
} as const;

export const NAV = [
  { id: "estudio", label: "Estudio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
] as const;

export const HERO = {
  eyebrow: "Estudio de productos digitales · Barcelona",
  headline: "Creamos productos",
  headlineAccent: "que escalan.",
  tagline:
    "Diseño y desarrollo para web, móvil y plataformas.",
  ctaWork: "Ver proyectos",
  ctaContact: "Iniciar proyecto",
} as const;

export const ESTUDIO = {
  label: "01 — Estudio",
  heading: "Productos, no solo interfaces",
  summary:
    "Estudio Colibrí es un estudio de productos digitales en Barcelona. Te acompañamos desde la idea hasta el lanzamiento para crear un producto digital que impulse tu negocio.",
  stats: [
    { id: "projects", value: "20+", label: "Proyectos entregados" },
    { id: "location", value: "Barcelona", label: "Ubicación" },
    { id: "delivery", value: "End-to-end", label: "De la idea al lanzamiento" },
  ],
} as const;

export type WorkAccent = "coral" | "sage" | "mustard";

export const PROYECTOS = {
  label: "02 — Proyectos",
  heading: "Donde generamos impacto",
  intro:
    "En sectores muy distintos acompañamos a negocios con productos digitales con impacto real.",
  items: [
    {
      id: "hospitality",
      accent: "coral" as WorkAccent,
      icon: Hotel,
      title: "Turismo y hostelería",
      tagline:
        "Reservas, gestión y experiencias digitales para hoteles, restaurantes y negocios de hostelería.",
    },
    {
      id: "automotive",
      accent: "sage" as WorkAccent,
      icon: Car,
      title: "Movilidad",
      tagline:
        "Productos digitales para el tracking y la movilidad de productos en tu operación.",
    },
    {
      id: "logistics",
      accent: "coral" as WorkAccent,
      icon: Ship,
      title: "Logística",
      tagline: "Plataformas para operaciones, envíos y relación con clientes.",
    },
    {
      id: "retail",
      accent: "sage" as WorkAccent,
      icon: ShoppingBag,
      title: "Ecommerce",
      tagline: "Catálogos y experiencias de compra para marcas que venden online y offline.",
    },
    {
      id: "entertainment",
      accent: "coral" as WorkAccent,
      icon: Sparkles,
      title: "Entretenimiento",
      tagline: "Contenido, comunidades y experiencias para audiencias conectadas.",
    },
    {
      id: "construction",
      accent: "sage" as WorkAccent,
      icon: Building2,
      title: "Construcción",
      tagline: "Procesos y herramientas digitales para empresas del sector.",
    },
    {
      id: "fintech",
      accent: "mustard" as WorkAccent,
      icon: Wallet,
      title: "Fintech",
      tagline: "Productos financieros digitales claros para usuarios y tu negocio.",
    },
    {
      id: "saas",
      accent: "coral" as WorkAccent,
      icon: LayoutDashboard,
      title: "SaaS y plataformas",
      tagline: "Herramientas y plataformas B2B pensadas para crecer con el negocio.",
    },
  ],
} as const;

export const SERVICIOS = {
  label: "03 — Servicios",
  heading: "Qué hacemos",
  intro:
    "Acompañamiento de punta a punta, desde la primera conversación hasta el lanzamiento — y más allá.",
  items: [
    {
      id: "strategy",
      icon: Compass,
      title: "Estrategia y discovery",
      description:
        "Alineamos visión, usuarios y roadmap antes de diseñar una sola pantalla.",
    },
    {
      id: "design",
      icon: Palette,
      title: "UX y diseño visual",
      description:
        "Interfaces que se entienden al instante — pulidas, coherentes con tu marca y listas para lanzar.",
    },
    {
      id: "product",
      icon: Layers,
      title: "Desarrollo de producto",
      description:
        "Construimos el producto completo: apps web, plataformas y los sistemas que las sostienen.",
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Experiencias móviles",
      description:
        "Apps con sensación nativa para iOS y Android, con el mismo cuidado que en web.",
    },
    {
      id: "launch",
      icon: Rocket,
      title: "Lanzamiento y entrega",
      description:
        "Soporte en el go-live, control de calidad y una entrega clara para tu negocio.",
    },
    {
      id: "growth",
      icon: LineChart,
      title: "Escala y partnership",
      description:
        "Colaboración a largo plazo mientras tu producto evoluciona — nuevas features, nuevos mercados.",
    },
  ] as const satisfies ReadonlyArray<{
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
  }>,
} as const;

export const CONTACTO = {
  label: "04 — Contacto",
  heading: "Construyamos algo",
  intro:
    "Cuéntanos tu producto. Trabajamos con startups y negocios consolidados en proyectos nuevos y de escalado.",
  form: {
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar mensaje",
    sending: "Enviando…",
    success: "Mensaje enviado. Te responderemos pronto.",
    nameRequired: "Introduce tu nombre",
    emailRequired: "Introduce tu email",
    emailInvalid: "Introduce un email válido",
    messageRequired: "Cuéntanos sobre tu proyecto",
    errorNotConfigured:
      "El email aún no está configurado. Prueba el enlace de correo.",
    errorInvalid: "Revisa el formulario e inténtalo de nuevo.",
    errorCaptcha:
      "Completa la verificación de seguridad e inténtalo de nuevo.",
    errorTestingSender:
      "El remitente de prueba solo entrega al email de tu cuenta Resend. Configura CONTACT_INBOX_EMAIL en .env.local o verifica un dominio en Resend.",
    errorSend: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
  },
} as const;
