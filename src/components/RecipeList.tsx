import Grid from '@mui/material/Grid';
import RecipeCard from './RecipeCard';
import { IRecipe } from '@/types';

interface RecipeListProps {
  recipes: IRecipe[];
  favoriteIds: string[];
  isAuthenticated: boolean;
}

export default function RecipeList({ recipes, favoriteIds, isAuthenticated }: RecipeListProps) {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid key={recipe._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <RecipeCard
            recipe={recipe}
            isFavorite={favoriteIds.includes(recipe._id)}
            isAuthenticated={isAuthenticated}
          />
        </Grid>
      ))}
    </Grid>
  );
}
