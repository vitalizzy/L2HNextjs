import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "L2H Community",
  description: "Gestión de comunidad de propiedades",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
