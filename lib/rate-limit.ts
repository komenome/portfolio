// Edge-compatible rate limiting for Cloudflare Workers
// NOTE: This module is designed so the storage backend can be swapped to
// Cloudflare KV or D1 without changing the consumer interface.

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

export interface RateLimitOptions {
  maxRequests?: number;
  windowMs?: number;
}

export interface RateLimiter {
  check(request: Request, options?: RateLimitOptions): Promise<RateLimitResult> | RateLimitResult;
}

// WARNING: In-memory Map is local to each Edge PoP. Use Cloudflare KV for global rate limiting.
class InMemoryRateLimiter implements RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private lastCleanup = Date.now();
  private readonly CLEANUP_INTERVAL_MS = 60 * 1000; // 1 minute

  private cleanupExpiredEntries() {
    const now = Date.now();
    if (now - this.lastCleanup < this.CLEANUP_INTERVAL_MS) return;

    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
    this.lastCleanup = now;
  }

  check(request: Request, options: RateLimitOptions = {}): RateLimitResult {
    const maxRequests = options.maxRequests ?? 10;
    const windowMs = options.windowMs ?? 60 * 1000; // 1 minute default

    this.cleanupExpiredEntries();

    const clientIP = getClientIP(request);
    const now = Date.now();
    const key = `${clientIP}`;

    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      // First request or window expired — start new window
      this.store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return { allowed: true };
    }

    if (entry.count >= maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      return { allowed: false, retryAfter };
    }

    entry.count += 1;
    return { allowed: true };
  }
}

function getClientIP(request: Request): string {
  // On Cloudflare, cf-connecting-ip is the most reliable source.
  // We use it exclusively to prevent IP spoofing via x-forwarded-for.
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;

  // Fallback when not behind Cloudflare (e.g. local dev)
  return "unknown";
}

// Default instance using in-memory store.
// To migrate to Cloudflare KV/D1, implement RateLimiter and replace this export.
const defaultLimiter: RateLimiter = new InMemoryRateLimiter();

export async function checkRateLimit(
  request: Request,
  options?: RateLimitOptions
): Promise<RateLimitResult> {
  return defaultLimiter.check(request, options);
}
