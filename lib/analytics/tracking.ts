"use client";

export const LANDING_EVENTS = {
  HERO_CTA_PRIMARY_CLICK: "landing_hero_cta_primary_click",
  HERO_CTA_SECONDARY_CLICK: "landing_hero_cta_secondary_click",
  CONTACT_EMAIL_CLICK: "landing_contact_email_click",
  CONTACT_WHATSAPP_CLICK: "landing_contact_whatsapp_click",
  CONTACT_WEB_CLICK: "landing_contact_web_click",
  CONTACT_MAPS_CLICK: "landing_contact_maps_click",
  CONTACT_WAZE_CLICK: "landing_contact_waze_click",
  CONTACT_FINAL_CTA_CLICK: "landing_contact_final_cta_click",
  LANGUAGE_SWITCH: "landing_language_switch",
  MOBILE_MENU_TOGGLE: "landing_mobile_menu_toggle",
  SCROLL_DEPTH: "landing_scroll_depth",
} as const;

export type LandingEventName = (typeof LANDING_EVENTS)[keyof typeof LANDING_EVENTS];

export type LandingEventPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export function trackLandingEvent(event: LandingEventName, payload: LandingEventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event,
    ...payload,
    ts: Date.now(),
    path: window.location.pathname,
  };

  try {
    const dl = window.dataLayer;
    if (Array.isArray(dl)) {
      dl.push(eventPayload);
    }

    window.gtag?.("event", event, payload);

    window.dispatchEvent(new CustomEvent("landing:track", { detail: eventPayload }));
  } catch {
    /* Never break UX if a tag manager or analytics script misbehaves */
  }
}
