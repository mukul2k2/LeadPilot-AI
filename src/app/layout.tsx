import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LeadProvider } from '@/context/LeadContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeadPilot AI | Lead Follow-Up Agent for Packaging Machinery',
  description: 'AI-powered sales follow-up command center. Tells packaging equipment sales reps who to follow up with today and what to say over WhatsApp.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-100">
      <body className={`${inter.className} min-h-full text-slate-900 antialiased flex flex-col`}>
        <LeadProvider>
          {children}
        </LeadProvider>
      </body>
    </html>
  );
}
