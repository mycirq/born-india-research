import './globals.css';

export const metadata = {
  metadataBase: new URL('https://mybornindiaresearch.com'),
  title: 'Groundwork · Independent real estate investment research',
  description:
    'Groundwork is independent real-estate investment research for India, by Born India Research. We do the groundwork so you can invest with clarity. No commissions, the decision stays yours.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Groundwork by Born India Research',
    title: 'Groundwork · Independent real estate investment research',
    description:
      'We do the groundwork so you can invest in Indian real estate with clarity. Independent, no commissions, the decision stays yours.',
    url: 'https://mybornindiaresearch.com/',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23F7F4EC'/%3E%3Crect x='7' y='7' width='18' height='18' fill='none' stroke='%23A8461D' stroke-width='2'/%3E%3Cline x1='7' y1='13' x2='25' y2='13' stroke='%2315130E' stroke-width='1'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
