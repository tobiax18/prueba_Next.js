import { connectDB } from '@/lib/mongodb';
import Favorite from '@/models/Favorite';
import { IRecipe } from '@/types';
import { getRecipeById } from './recipe.service';

export async function getUserFavoriteIds(userId: string): Promise<string[]> {
  await connectDB();
  const favorites = await Favorite.find({ userId }).lean();
  return favorites.map((f) => f.recipeId);
}

export async function getUserFavoriteRecipes(userId: string): Promise<IRecipe[]> {
  const recipeIds = await getUserFavoriteIds(userId);
  const recipes = await Promise.all(recipeIds.map((id) => getRecipeById(id)));
  return recipes.filter((r): r is IRecipe => r !== null);
}

export async function addFavorite(userId: string, recipeId: string): Promise<void> {
  await connectDB();
  await Favorite.findOneAndUpdate(
    { userId, recipeId },
    { userId, recipeId },
    { upsert: true }
  );
}

export async function removeFavorite(userId: string, recipeId: string): Promise<void> {
  await connectDB();
  await Favorite.deleteOne({ userId, recipeId });
}

export async function isFavorite(userId: string, recipeId: string): Promise<boolean> {
  await connectDB();
  const fav = await Favorite.findOne({ userId, recipeId });
  return !!fav;
}
