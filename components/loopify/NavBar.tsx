'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';

interface NavItem {
  label: string;
  labelUz: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', labelUz: 'Bosh sahifa', href: '/', icon: '🏠' },
  { label: 'Learn', labelUz: "O'quv", href: '/learning', icon: '📚' },
  { label: 'Quiz', labelUz: 'Quizlar', href: '/quiz', icon: '📝' },
  { label: 'Challenges', labelUz: 'Tanlovlar', href: '/gamification', icon: '🎮' },
  { label: 'Chat', labelUz: 'Chat', href: '/chat', icon: '💬' },
];

export function NavBar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around max-w-2xl mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all ${
                isActive
                  ? 'text-primary border-t-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{language === 'uz' ? item.labelUz : item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
