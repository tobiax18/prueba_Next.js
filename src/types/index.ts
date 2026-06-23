export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IRecipe {
  _id: string;
  name: string;
  image: string;
  description: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  preparationTime: number;
  servings: number;
  ingredients: string[];
  steps: string[];
}

export interface IFavorite {
  _id: string;
  userId: string;
  recipeId: string;
}

export interface RecipeCardProps {
  recipe: IRecipe;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}
