import './globals.css';
export const metadata = { title: 'Argentalk', description: 'Hablá con argentinos reales' };
export default function RootLayout({ children }) {
  return (<html lang="es"><body>{children}</body></html>);
}
