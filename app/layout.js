import './globals.css';

export const metadata = {
  title: 'Argentalk - Hablá con argentinos reales',
  description: 'Conectá con argentinos reales. Mate, truco, fútbol y cultura argentina.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}