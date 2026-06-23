import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry';
import { getSession } from '@/lib/auth';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'Descubre y guarda tus recetas favoritas',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          <Navbar user={session ? { name: session.name, email: session.email } : null} />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}
