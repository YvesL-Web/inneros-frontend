'use client';
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('theme') ?? 'default' : 'default'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <div
        style={{ position: 'fixed', right: 16, bottom: 16, display: 'flex', gap: 8, zIndex: 50 }}
      >
        <button className="button-ghost" onClick={() => setTheme('default')}>
          Default
        </button>
        <button className="button-ghost" onClick={() => setTheme('aurora')}>
          Aurora
        </button>
      </div>
      {children}
    </>
  );
}
