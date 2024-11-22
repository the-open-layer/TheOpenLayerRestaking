import { LayoutDashboard, Repeat, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';

const FooterNav = () => {
  const navs = useMemo(() => {
    return [
      {
        text: 'Dashboard',
        link: '/dashboard',
        icon: <LayoutDashboard size={24} />,
        isReady: false,
      },
      {
        text: 'Restake',
        link: '/restake',
        icon: <Repeat size={24} />,
        isReady: true,
      },
      {
        text: 'Validator',
        link: '/validator',
        icon: <Users size={24} />,
        isReady: false,
      },
    ];
  }, []);
  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <nav className="flex justify-around p-2">
          {navs.map((nav, index) =>
            nav.isReady ? (
              <NavLink key={index} to={nav.link}>
                {({ isActive }) => (
                  <div
                    className={cn(
                      isActive ? 'text-blue-500' : 'text-gray-400',
                      'text-xs flex flex-col items-center'
                    )}
                  >
                    {nav.icon}
                    {nav.text}
                  </div>
                )}
              </NavLink>
            ) : (
              <div
                key={index}
                className="text-xs text-gray-400  flex flex-col items-center"
              >
                {nav.icon}
                {nav.text}
              </div>
            )
          )}
        </nav>
      </footer>
    </>
  );
};

export default memo(FooterNav);
