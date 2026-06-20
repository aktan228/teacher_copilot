import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teacher Copilot — AI assistant for teachers",
  description:
    "Plan lessons, generate quizzes, and grade work in seconds. Teacher Copilot automates the busywork so teachers can focus on students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
