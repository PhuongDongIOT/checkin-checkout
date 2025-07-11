import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default async function middleware(
    request: NextRequest,
    event: NextFetchEvent,
): Promise<Response | undefined> {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || "127.0.0.1";
    const { success, pending, limit, reset, remaining } =
        await ratelimit.limit(ip);
    return success
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/blocked", request.url));
}

export const config = {
    matcher: "/",
};