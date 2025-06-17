'use server';

import { redirect } from 'next/navigation';
import { withTeam } from '@/lib/auth/middleware';

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
});

export const customerPortalAction = withTeam(async (_, team) => {
});
