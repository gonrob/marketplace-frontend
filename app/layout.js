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
```

Guarda con **CMD + S**. El botón home lo vamos a agregar directamente en el nav de cada página — la forma más limpia es crear un componente `Nav` reutilizable.

En la terminal:
```
touch app/components/Nav.js
open -a TextEdit app/components/Nav.js