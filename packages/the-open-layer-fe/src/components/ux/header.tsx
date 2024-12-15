import { Button } from '@/components/ui/button';
import LogoText from '@/assets/images/icon/logo/logotext.svg?react';
import Logo from '@/assets/images/icon/logo/logo.svg?react';
import { memo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TonConnectButton } from '@tonconnect/ui-react';
import { navItems } from '@/constant';
import { useIsMobile } from '@/hooks/useResponsive';
// import { useLoaderData } from 'react-router-dom';
import { useAccount } from '@/hooks/useAccount';

const Header = () => {
  const isMobile = useIsMobile();
  // const { title } = useLoaderData() as { title: string };
  const { connected, tonConnectUI } = useAccount();

  return (
    <header className="flex items-center justify-between px-6 py-4 ">
      <Link to="/">
        {isMobile ? (
          <Logo className="size-8" />
        ) : (
          <LogoText className="h-10 aspect-[488/136] w-auto" />
        )}
      </Link>

      <nav className="hidden md:flex md:gap-x-2.5">
        {navItems.map((nav, index) =>
          nav.isReady ? (
            <NavLink key={index} to={nav.link}>
              {({ isActive }) => (
                <Button
                  variant="link"
                  size="sm"
                  className={cn(
                    'text-base font-medium text-black rounded-2xl',
                    isActive ? 'font-medium bg-[#C9D4F2]' : ''
                  )}
                >
                  {nav.text}
                </Button>
              )}
            </NavLink>
          ) : (
            <Button
              key={index}
              disabled
              variant="ghost"
              className="text-base text-black rounded-2xl"
            >
              {nav.text}
            </Button>
          )
        )}
      </nav>


      {/* TODO: title */}
      <nav className="flex md:hidden md:gap-x-2.5">
        {navItems
          .filter(item => item.isReady && item.link === window.location.pathname)
          .map(item => item.text)}
      </nav>

      <div className="flex items-center space-x-4">
        {connected && (
          <span className="hidden text-base font-medium lg:block">0 POINT</span>
        )}
        {connected ? (
          <TonConnectButton />
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="border border-black rounded-2xl"
            onClick={() => {
              tonConnectUI.openModal();
            }}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
