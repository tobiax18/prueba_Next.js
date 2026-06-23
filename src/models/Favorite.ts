import mongoose, { Schema, Document, Model } from 'mongoose';
import { IFavorite } from '@/types';

export interface IFavoriteDocument extends Omit<IFavorite, '_id'>, Document {}

const FavoriteSchema = new Schema<IFavoriteDocument>(
  {
    userId: { type: String, required: true },
    recipeId: { type: String, required: true },
  },
  { timestamps: true }
);

FavoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

const Favorite: Model<IFavoriteDocument> =
  mongoose.models.Favorite ?? mongoose.model<IFavoriteDocument>('Favorite', FavoriteSchema);

export default Favorite;
