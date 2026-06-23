'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { addFavorite, removeFavorite } from '@/services/favorite.service';

export async function toggleFavoriteAction(recipeId: string, currentlyFavorite: boolean) {
  const session = await getSession();
  if (!session) return { error: 'No autenticado' };

  if (currentlyFavorite) {
    await removeFavorite(session.userId, recipeId);
  } else {
    await addFavorite(session.userId, recipeId);
  }

  revalidatePath('/');
  revalidatePath('/favorites');
}
