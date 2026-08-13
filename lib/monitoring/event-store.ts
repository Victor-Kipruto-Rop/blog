// [v2] Lightweight event log — mirrors PesaGuard's event_store pattern.
// Swap this in-memory array for SQLite/Supabase table: (event_type, timestamp, payload)

interface SystemEvent {
  event_type: string;
  timestamp: string;
  payload: unknown;
}

const events: SystemEvent[] = [];

export function logEvent(event_type: string, payload: unknown) {
  events.push({ event_type, timestamp: new Date().toISOString(), payload });
}

export function getRecentEvents(limit = 50): SystemEvent[] {
  return events.slice(-limit).reverse();
}
