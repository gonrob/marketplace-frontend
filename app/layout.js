import './globals.css';

export const metadata = {
  title: 'Argentalk - Hablá con argentinos reales',
  description: 'Conectá con argentinos, practicá español y viví la cultura'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
