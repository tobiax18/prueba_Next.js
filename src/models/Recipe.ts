import mongoose, { Schema, Document, Model } from 'mongoose';
import { IRecipe } from '@/types';

export interface IRecipeDocument extends Omit<IRecipe, '_id'>, Document {}

const RecipeSchema = new Schema<IRecipeDocument>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Fácil', 'Media', 'Difícil'], required: true },
  preparationTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  ingredients: [{ type: String }],
  steps: [{ type: String }],
});

const Recipe: Model<IRecipeDocument> =
  mongoose.models.Recipe ?? mongoose.model<IRecipeDocument>('Recipe', RecipeSchema);

export default Recipe;
