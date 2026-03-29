import './globals.css';

export const metadata = {
  title: 'Marketplace - Stripe Connect',
  description: 'Plataforma de pagos con Stripe Connect'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
