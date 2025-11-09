'use client';

import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from 'react-hot-toast';
import TopBar from './components/TopBar';
import ThemeProvider from './components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TopBar />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster position="top-right" />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
