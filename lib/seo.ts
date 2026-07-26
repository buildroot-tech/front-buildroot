import type { Metadata } from "next";

export const siteConfig = {
  name: "buildroot_ | Digital Products & Engineering",
  description:
    "We build brutalist, high-performance web applications, digital products, and SaaS solutions for modern tech ventures.",
  url: "https://buildroot.dev",
  ogImage: "https://buildroot.dev/og.jpg",
  links: {
    github: "https://github.com/buildroot",
    linkedin: "https://linkedin.com/company/buildroot",
  },
  keywords: [
    "Web Development",
    "Digital Products",
    "Software Engineering",
    "SaaS",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer Motion",
  ],
};

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | buildroot_`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "buildroot_",
      url: siteConfig.url,
    },
  ],
  creator: "buildroot_",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@buildroot_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
