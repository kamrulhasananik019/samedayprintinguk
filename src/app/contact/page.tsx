import type { Metadata } from "next";
import { Suspense } from "react";
import ContactPageContent from "@/components/contact/contact-page";
import { getCategoriesWithProducts } from "@/lib/catalog";
import { siteName, siteSeoDescription } from "@/lib/site";

/** Cache contact page for 1 week; invalidated only by admin category/product changes */
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Contact | Samedayprintinguk",
  description: siteSeoDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Samedayprintinguk",
    description: siteSeoDescription,
    url: "/contact",
    type: "website",
    siteName,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Samedayprintinguk contact and quote request",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Samedayprintinguk",
    description: siteSeoDescription,
    images: ["/logo.png"],
  },
};

export default async function ContactPage() {
  const categories = await getCategoriesWithProducts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <ContactPageContent categories={categories} />
    </Suspense>
  );
}
