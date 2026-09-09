/**
 * Minimal in-memory rate limiter for server actions.
 *
 * Per-instance: resets on redeploy/restart, not shared across serverless
 * functions. Good enough to blunt casual spam and floods; the honeypot
 * and payload checks below it handle the rest.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodic sweep so the map does not grow unbounded.
const SWEEP_INTERVAL_MS = 60_000;
let lastSweep = 0;

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  if (now - lastSweep > SWEEP_INTERVAL_MS) {
    lastSweep = now;
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
