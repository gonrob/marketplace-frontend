'use client';
import './globals.css';
import Argento from './components/Argento';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Argento />
      </body>
    </html>
  );
}