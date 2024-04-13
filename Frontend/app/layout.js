import "./globals.css";

export const metadata = {
  title: "Tweethub",
  description: "tweethub social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
