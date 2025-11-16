import './globals.css';

export const metadata = {
  title: 'Creative Uses Generator',
  description: 'Ideas for everyday objects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
