import { Container, Typography, Box } from '@mui/material';
import { getAllRecipes } from '@/services/recipe.service';
import { getUserFavoriteIds } from '@/services/favorite.service';
import { getSession } from '@/lib/auth';
import RecipeList from '@/components/RecipeList';

export default async function HomePage() {
  const [recipes, session] = await Promise.all([getAllRecipes(), getSession()]);
  const favoriteIds = session ? await getUserFavoriteIds(session.userId) : [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          Catálogo de Recetas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora nuestra colección de recetas y guarda tus favoritas
        </Typography>
      </Box>
      <RecipeList
        recipes={recipes}
        favoriteIds={favoriteIds}
        isAuthenticated={!!session}
      />
    </Container>
  );
}
