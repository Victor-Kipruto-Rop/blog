// Privacy-friendly analytics wrapper (Plausible/Umami)
export function track(eventName: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // @ts-ignore
  if (window.plausible) {
    // @ts-ignore
    window.plausible(eventName, { props });
  }
}
