import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MOOSE AI — Your Personal AI Assistant',
  description:
    'A clean, modern, premium AI chatbot interface built for fine-tuned open-source language models. Computer Science Major Project.',
  icons: {
    icon: '/moose-logo.png',
    apple: '/moose-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full light">
      <body className="h-full bg-white text-slate-900 flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
