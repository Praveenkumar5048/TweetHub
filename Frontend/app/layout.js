import "./globals.css";
import ClientLayout from './clientLayout.js';

export const metadata = {
  title: "Tweethub",
  description: "tweethub social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}