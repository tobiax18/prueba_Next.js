import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { IRecipe } from '@/types';

const SEED_RECIPES = [
  {
    name: 'Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    description: 'Clásica pasta italiana cremosa con huevo, queso pecorino y guanciale.',
    difficulty: 'Media',
    preparationTime: 25,
    servings: 2,
    ingredients: ['200g spaghetti', '100g guanciale', '2 huevos', '50g queso pecorino', 'Pimienta negra', 'Sal'],
    steps: ['Cocinar la pasta al dente.', 'Dorar el guanciale en sartén.', 'Mezclar huevos y queso en un bol.', 'Combinar pasta caliente con la mezcla fuera del fuego.', 'Añadir guanciale y servir con pimienta.'],
  },
  {
    name: 'Tacos al Pastor',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    description: 'Tacos mexicanos con carne de cerdo marinada en achiote y piña.',
    difficulty: 'Media',
    preparationTime: 40,
    servings: 4,
    ingredients: ['500g cerdo', 'Achiote', '2 chiles guajillo', 'Piña', 'Tortillas', 'Cilantro', 'Cebolla'],
    steps: ['Marinar el cerdo en achiote y chiles.', 'Asar la carne en sartén o parrilla.', 'Cortar en trozos pequeños.', 'Servir en tortillas con piña, cilantro y cebolla.'],
  },
  {
    name: 'Salmón Teriyaki',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    description: 'Filete de salmón glaseado con salsa teriyaki casera.',
    difficulty: 'Fácil',
    preparationTime: 20,
    servings: 2,
    ingredients: ['2 filetes de salmón', '4 cdas salsa de soja', '2 cdas mirin', '1 cda azúcar', '1 cda sake', 'Sésamo', 'Cebollín'],
    steps: ['Mezclar soja, mirin, azúcar y sake para la salsa.', 'Marinar el salmón 15 min.', 'Cocinar en sartén 4 min por lado.', 'Glasear con la salsa restante.', 'Servir con sésamo y cebollín.'],
  },
  {
    name: 'Guacamole Clásico',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937b?w=800',
    description: 'Guacamole fresco y cremoso, receta tradicional mexicana.',
    difficulty: 'Fácil',
    preparationTime: 10,
    servings: 4,
    ingredients: ['3 aguacates maduros', '1 lima', '1 tomate', '1/2 cebolla', 'Cilantro', 'Chile serrano', 'Sal'],
    steps: ['Machacar el aguacate con un tenedor.', 'Añadir jugo de lima, sal y mezclar.', 'Picar tomate, cebolla, chile y cilantro.', 'Incorporar todo y ajustar sal.', 'Servir inmediatamente.'],
  },
  {
    name: 'Risotto de Hongos',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
    description: 'Arroz cremoso italiano con variedad de hongos y parmesano.',
    difficulty: 'Difícil',
    preparationTime: 45,
    servings: 3,
    ingredients: ['300g arroz arborio', '200g hongos mixtos', '1L caldo de vegetales', '1 cebolla', 'Vino blanco', 'Parmesano', 'Mantequilla', 'Ajo'],
    steps: ['Sofreír cebolla y ajo en mantequilla.', 'Añadir arroz y tostar 2 min.', 'Incorporar vino y dejar absorber.', 'Añadir caldo caliente de a poco, removiendo.', 'Saltear hongos por separado.', 'Mezclar hongos, parmesano y mantequilla al final.'],
  },
  {
    name: 'Pollo al Limón',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800',
    description: 'Pechuga de pollo jugosa con salsa de limón y hierbas.',
    difficulty: 'Fácil',
    preparationTime: 30,
    servings: 2,
    ingredients: ['2 pechugas de pollo', '2 limones', 'Ajo', 'Romero', 'Tomillo', 'Aceite de oliva', 'Sal', 'Pimienta'],
    steps: ['Marinar pollo con limón, ajo y hierbas 20 min.', 'Sellar en sartén caliente 3 min por lado.', 'Hornear a 180°C por 15 min.', 'Reposar 5 min antes de servir.'],
  },
  {
    name: 'Ensalada César',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800',
    description: 'Ensalada clásica con lechuga romana, crutones y aderezo César.',
    difficulty: 'Fácil',
    preparationTime: 15,
    servings: 2,
    ingredients: ['1 lechuga romana', 'Crutones', '50g parmesano', '2 cdas mayonesa', '1 cda mostaza Dijon', '1 diente ajo', 'Jugo de limón', 'Salsa inglesa'],
    steps: ['Mezclar mayonesa, mostaza, ajo picado, limón y salsa inglesa.', 'Cortar lechuga en trozos.', 'Combinar con aderezo.', 'Añadir crutones y parmesano rallado.'],
  },
  {
    name: 'Brownie de Chocolate',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800',
    description: 'Brownie denso y fudgy con chocolate oscuro y nueces.',
    difficulty: 'Fácil',
    preparationTime: 35,
    servings: 8,
    ingredients: ['200g chocolate oscuro', '150g mantequilla', '3 huevos', '200g azúcar', '100g harina', '50g nueces', 'Vainilla', 'Sal'],
    steps: ['Derretir chocolate y mantequilla a baño María.', 'Batir huevos y azúcar hasta blanquear.', 'Mezclar chocolate con huevos.', 'Incorporar harina y sal.', 'Añadir nueces.', 'Hornear a 175°C por 25 min.'],
  },
  {
    name: 'Gazpacho Andaluz',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    description: 'Sopa fría española de tomate, perfecta para el verano.',
    difficulty: 'Fácil',
    preparationTime: 15,
    servings: 4,
    ingredients: ['1kg tomates maduros', '1 pepino', '1 pimiento rojo', '1 diente ajo', '3 cdas aceite oliva', '2 cdas vinagre', 'Sal', 'Pan duro'],
    steps: ['Remojar el pan en agua.', 'Triturar todos los vegetales con el ajo.', 'Añadir aceite, vinagre y sal.', 'Pasar por colador fino.', 'Refrigerar al menos 2 horas antes de servir.'],
  },
  {
    name: 'Pad Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
    description: 'Fideos de arroz tailandeses salteados con camarón y maní.',
    difficulty: 'Media',
    preparationTime: 30,
    servings: 2,
    ingredients: ['200g fideos de arroz', '200g camarones', '2 huevos', '100g brotes de soya', '3 cdas salsa de pescado', '1 cda azúcar de palma', 'Maní tostado', 'Lima', 'Cebollín'],
    steps: ['Remojar fideos en agua caliente 20 min.', 'Saltear camarones en wok.', 'Añadir fideos y salsa.', 'Hacer espacio y revolver huevos.', 'Incorporar brotes y cebollín.', 'Servir con maní y lima.'],
  },
];

export async function getAllRecipes(): Promise<IRecipe[]> {
  await connectDB();

  const count = await Recipe.countDocuments();
  if (count === 0) {
    await Recipe.insertMany(SEED_RECIPES);
  }

  const recipes = await Recipe.find({}).lean();
  return recipes.map((r) => ({ ...r, _id: r._id.toString() })) as IRecipe[];
}

export async function getRecipeById(id: string): Promise<IRecipe | null> {
  await connectDB();

  try {
    const recipe = await Recipe.findById(id).lean();
    if (!recipe) return null;
    return { ...recipe, _id: recipe._id.toString() } as IRecipe;
  } catch {
    return null;
  }
}
