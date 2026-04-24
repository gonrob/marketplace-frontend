import './globals.css';
import Argento from './components/Argento';

export const metadata = {
  metadataBase: new URL("https://knowan.net"),
  alternates: { canonical: "/" },
  title: 'Knowan',
  description: 'Conectá con argentinos reales. Viví la cultura.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EY1HJMEX4M"></script>
        <script dangerouslySetInnerHTML={{__html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-EY1HJMEX4M');"}} />
        <link rel="icon" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Knowan" />
        <meta name="theme-color" content="#4B6CB7" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {children}
        <Argento />
      </body>
    </html>
  );
}
