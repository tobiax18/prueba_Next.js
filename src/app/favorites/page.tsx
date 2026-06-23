import { redirect } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getSession } from '@/lib/auth';
import { getUserFavoriteRecipes, getUserFavoriteIds } from '@/services/favorite.service';
import RecipeList from '@/components/RecipeList';

export default async function FavoritesPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const [recipes, favoriteIds] = await Promise.all([
    getUserFavoriteRecipes(session.userId),
    getUserFavoriteIds(session.userId),
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <FavoriteIcon color="error" />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Mis Favoritos
        </Typography>
      </Box>

      {recipes.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Aún no tienes recetas favoritas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explora el catálogo y guarda las que más te gusten
          </Typography>
        </Box>
      ) : (
        <RecipeList recipes={recipes} favoriteIds={favoriteIds} isAuthenticated />
      )}
    </Container>
  );
}
