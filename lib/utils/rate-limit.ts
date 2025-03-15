interface RateLimitResult {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
}

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export async function rateLimit(request: Request): Promise<RateLimitResult> {
  if (process.env.NODE_ENV === 'development') {
    return { success: true };
  }

  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;

  // Clean up old entries
  Array.from(rateLimitMap.entries()).forEach(([key, data]) => {
    if (data.timestamp < windowStart) {
      rateLimitMap.delete(key);
    }
  });

  const data = rateLimitMap.get(ip);
  if (!data) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS - 1 };
  }

  if (data.timestamp < windowStart) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS - 1 };
  }

  if (data.count >= MAX_REQUESTS) {
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: data.timestamp + WINDOW_SIZE
    };
  }

  data.count++;
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - data.count
  };
}