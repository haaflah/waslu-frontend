import type { Metadata } from "next";
import type { ReactNode } from "react";
import { t } from "@/i18n";
import "./globals.css";

export function generateMetadata(): Metadata {
  return {
    title: t("common.app.name"),
    description: t("storefront.meta.description")
  };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
