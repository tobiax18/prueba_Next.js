import { resendClient } from '@/lib/resend';

interface WelcomeEmailParams {
  name: string;
  email: string;
}

export async function sendWelcomeEmail({ name, email }: WelcomeEmailParams): Promise<void> {
  try {
    await resendClient.emails.send({
      from: 'Recipe App <onboarding@resend.dev>',
      to: email,
      subject: 'Bienvenido a Recipe App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #e65100;">¡Bienvenido a Recipe App!</h1>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Gracias por registrarte en nuestra plataforma de recetas. Ahora puedes:</p>
          <ul>
            <li>Explorar nuestro catálogo de recetas</li>
            <li>Guardar tus recetas favoritas</li>
          </ul>
          <p style="color: #757575; font-size: 14px;">El equipo de Recipe App</p>
        </div>
      `,
    });
  } catch (error) {
    // Log error but don't throw — registration should not fail if email fails
    console.error('Failed to send welcome email:', error);
  }
}
