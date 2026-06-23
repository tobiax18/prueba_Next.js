'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { registerUser, loginUser } from '@/services/auth.service';
import { signToken } from '@/lib/auth';

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await registerUser({ name, email, password });
    const token = await signToken(user);
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Error al registrar' };
  }

  redirect('/');
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const user = await loginUser({ email, password });
    const token = await signToken(user);
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Error al iniciar sesión' };
  }

  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/');
}
