'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';
import { loginAction, registerAction } from '@/actions/auth.actions';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const action = mode === 'login' ? loginAction : registerAction;
      const result = await action(formData);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom align="center">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" action={handleSubmit} noValidate>
          {mode === 'register' && (
            <TextField
              name="name"
              label="Nombre"
              fullWidth
              required
              margin="normal"
              autoComplete="name"
            />
          )}
          <TextField
            name="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            margin="normal"
            autoComplete="email"
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            required
            margin="normal"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isPending}
            sx={{ mt: 3, mb: 2 }}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : (mode === 'login' ? 'Entrar' : 'Registrarse')}
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="text.secondary">
          {mode === 'login' ? (
            <>¿No tienes cuenta? <Link href="/register">Regístrate</Link></>
          ) : (
            <>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></>
          )}
        </Typography>
      </Paper>
    </Box>
  );
}
