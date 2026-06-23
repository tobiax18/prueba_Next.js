'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/navigation';
import { toggleFavoriteAction } from '@/actions/favorite.actions';
import { RecipeCardProps } from '@/types';

const difficultyColor: Record<string, 'success' | 'warning' | 'error'> = {
  Fácil: 'success',
  Media: 'warning',
  Difícil: 'error',
};

interface Props extends RecipeCardProps {
  isAuthenticated: boolean;
}

export default function RecipeCard({ recipe, isFavorite = false, isAuthenticated }: Props) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setLoading(true);
    setFavorite((prev) => !prev);
    await toggleFavoriteAction(recipe._id, favorite);
    setLoading(false);
  };

  return (
    <Card
      component={Link}
      href={`/recipes/${recipe._id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }} color="text.primary">
          {recipe.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {recipe.preparationTime} min
          </Typography>
        </Box>
        <Chip
          label={recipe.difficulty}
          color={difficultyColor[recipe.difficulty]}
          size="small"
          variant="outlined"
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
          <IconButton
            onClick={handleToggleFavorite}
            disabled={loading}
            color={favorite ? 'error' : 'default'}
            aria-label="toggle favorite"
          >
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
