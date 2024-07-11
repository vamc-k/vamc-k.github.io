import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StarsCanvas from "@/components/main/StarsBackground";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vamc.in/"),
  title: "Vamsi Krishna Kolli - Platform Engineer | Full Stack Developer",
  description:
    "Experienced software developer with a solid background in various programming languages and technologies, including JavaScript, React, Node.js, and Python.",
  keywords: [
    "Vamsi",
    "Krishna",
    "Kolli",
    "Vamsi Krishna",
    "Vamsi Krishna Kolli",
    "Java",
    "Springboot",
    "Python",
    "JavaScript",
    "Next.js",
    "React",
    "ReactNative",
    "Android",
  ],
  openGraph: {
    title: "Vamsi Krishna Kolli - Platform Engineer | Full Stack Developer",
    description:
      "Experienced software developer with a solid background in various programming languages and technologies, including JavaScript, React, Node.js, and Python.",
    images: "/OpenGraph.png",
  },
  alternates: {
    canonical: "https://vamc.in/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#111] overflow-y-scroll overflow-x-hidden`}
      >
        <SpeedInsights />
        <Analytics />
        <StarsCanvas />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
