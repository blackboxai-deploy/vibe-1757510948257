import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Youth Connect - One Platform, One Future",
  description: "Government of Andhra Pradesh's unified platform for youth services, opportunities, and development programs.",
  keywords: "Andhra Pradesh, Youth, Government, Services, Employment, Education, Skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}