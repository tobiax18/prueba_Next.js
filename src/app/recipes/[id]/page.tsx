import { notFound } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { getRecipeById } from '@/services/recipe.service';

interface PageProps {
  params: Promise<{ id: string }>;
}

const difficultyColor: Record<string, 'success' | 'warning' | 'error'> = {
  Fácil: 'success',
  Media: 'warning',
  Difícil: 'error',
};

export default async function RecipeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) notFound();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={recipe.image}
            alt={recipe.name}
            sx={{ width: '100%', borderRadius: 3, objectFit: 'cover', maxHeight: 450 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
            {recipe.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {recipe.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <Chip icon={<AccessTimeIcon />} label={`${recipe.preparationTime} min`} variant="outlined" />
            <Chip icon={<PeopleIcon />} label={`${recipe.servings} porciones`} variant="outlined" />
            <Chip
              icon={<SignalCellularAltIcon />}
              label={recipe.difficulty}
              color={difficultyColor[recipe.difficulty]}
              variant="outlined"
            />
          </Box>

          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Ingredientes
            </Typography>
            <List dense disablePadding>
              {recipe.ingredients.map((ingredient, i) => (
                <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                  <ListItemText primary={`• ${ingredient}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
            Pasos de preparación
          </Typography>
          <List>
            {recipe.steps.map((step, i) => (
              <ListItem key={i} alignItems="flex-start" sx={{ px: 0 }}>
                <Box
                  sx={{
                    minWidth: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 14,
                    mr: 2,
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </Box>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
