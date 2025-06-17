// import { eq } from 'drizzle-orm';
// import { db } from '@/lib/db/drizzle';
// import { users, teams, teamMembers } from '@/lib/db/schema';
// import { setSession } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/pricing', request.url));
  }

  try {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error handling successful checkout:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
