'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { logoutAction } from '@/actions/auth.actions';

interface NavbarProps {
  user?: { name: string; email: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = async () => {
    await logoutAction();
  };

  const navLinks = (
    <>
      <Button color="inherit" component={Link} href="/" startIcon={<RestaurantMenuIcon />}>
        Inicio
      </Button>
      <Button color="inherit" component={Link} href="/favorites" startIcon={<FavoriteIcon />}>
        Favoritos
      </Button>
      {user ? (
        <>
          <Typography variant="body2" sx={{ mx: 2, opacity: 0.9 }}>
            Hola, {user.name}
          </Typography>
          <Button variant="outlined" color="inherit" size="small" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} href="/login">
            Iniciar sesión
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            href="/register"
            sx={{ ml: 1 }}
          >
            Registrarse
          </Button>
        </>
      )}
    </>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      <Toolbar>
        <RestaurantMenuIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
        >
          Recipe App
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 250, pt: 2 }}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Inicio" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/favorites" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Favoritos" />
                    </ListItemButton>
                  </ListItem>
                  {user ? (
                    <>
                      <ListItem>
                        <ListItemText primary={`Hola, ${user.name}`} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                          <ListItemText primary="Cerrar sesión" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton component={Link} href="/login" onClick={() => setDrawerOpen(false)}>
                          <ListItemText primary="Iniciar sesión" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component={Link} href="/register" onClick={() => setDrawerOpen(false)}>
                          <ListItemText primary="Registrarse" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{navLinks}</Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
