import "./globals.css";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
