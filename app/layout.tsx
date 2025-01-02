import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col h-full bg-slate-800">
      <body className="flex flex-col h-full">{children}</body>
    </html>
  );
}
