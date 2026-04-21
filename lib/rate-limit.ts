// Simple in-memory rate limiter for API routes
// Note: For production on Cloudflare Workers, consider using Cloudflare KV or WAF rules
// for distributed rate limiting across all edge locations.

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const RATE_LIMIT_STORE = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL_MS = 60 * 1000; // 1 minute

let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  
  for (const [key, entry] of RATE_LIMIT_STORE.entries()) {
    if (now > entry.resetTime) {
      RATE_LIMIT_STORE.delete(key);
    }
  }
  lastCleanup = now;
}

function getClientIP(request: Request): string {
  // Try to get real IP from Cloudflare headers
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;

  // Fallback to a generic key (less ideal, but functional)
  return "unknown";
}

export function checkRateLimit(
  request: Request,
  options: {
    maxRequests?: number;
    windowMs?: number;
  } = {}
): { allowed: boolean; retryAfter?: number } {
  const maxRequests = options.maxRequests ?? 10;
  const windowMs = options.windowMs ?? 60 * 1000; // 1 minute default

  cleanupExpiredEntries();

  const clientIP = getClientIP(request);
  const now = Date.now();
  const key = `${clientIP}`;

  const entry = RATE_LIMIT_STORE.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window expired — start new window
    RATE_LIMIT_STORE.set(key, {
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
