import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Square Solution | Luxury Interior Design Jaipur',
  description: "Bespoke luxury interior design in Jaipur under the 'Jaipur Modern Heritage' theme, blending traditional Rajasthani architectural styling with sleek modern living.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
