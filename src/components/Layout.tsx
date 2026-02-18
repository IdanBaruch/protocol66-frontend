import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Camera, SmilePlus, History, Settings } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const nav = [
    { to: '/', icon: Home, label: 'בית' },
    { to: '/camera', icon: Camera, label: 'מצלמה' },
    { to: '/mood', icon: SmilePlus, label: 'מצב רוח' },
    { to: '/history', icon: History, label: 'היסטוריה' },
    { to: '/settings', icon: Settings, label: 'הגדרות' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex justify-around items-center max-w-2xl mx-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
