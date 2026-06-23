import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { sendWelcomeEmail } from './email.service';

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthResult {
  userId: string;
  email: string;
  name: string;
}

export async function registerUser({ name, email, password }: RegisterParams): Promise<AuthResult> {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) throw new Error('El correo ya está registrado');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  await sendWelcomeEmail({ name, email });

  return { userId: user._id.toString(), email: user.email, name: user.name };
}

export async function loginUser({ email, password }: LoginParams): Promise<AuthResult> {
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) throw new Error('Credenciales inválidas');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Credenciales inválidas');

  return { userId: user._id.toString(), email: user.email, name: user.name };
}
