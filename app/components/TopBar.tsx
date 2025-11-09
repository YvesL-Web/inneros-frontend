'use client';

import { useUnreadNotificationsCount } from '@/hooks/useUnreadNotificationsCount';
import Link from 'next/link';

export default function TopBar() {
  const unread = useUnreadNotificationsCount();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
        marginBottom: 16,
      }}
    >
      <Link href="/" style={{ fontWeight: 700, textDecoration: 'none', color: 'inherit' }}>
        InnerOS
      </Link>
      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href="/garden">Jardin</a>
        <a href="/notifications" style={{ position: 'relative' }}>
          Notifications
          {unread > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -6,
                right: -10,
                background: '#e11d48',
                color: 'white',
                borderRadius: 999,
                fontSize: 11,
                padding: '2px 6px',
                lineHeight: 1,
              }}
            >
              {unread}
            </span>
          )}
        </a>
      </nav>
    </header>
  );
}
