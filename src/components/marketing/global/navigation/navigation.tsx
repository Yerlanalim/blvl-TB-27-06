import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { NavigationMenuItems } from '@/components/marketing/global/navigation/navigation-items';
import { MobileMenu } from '@/components/marketing/global/navigation/mobile-menu';
import NavigationButtons from '@/components/marketing/global/navigation/navigation-buttons';

export default function MarketingNavigation() {
  return (
    <div className="fixed w-full py-5 z-[1000] bg-gradient-to-b from-[#000000] via-black/80 to-transparent backdrop-blur-sm">
      <div className="container flex items-center justify-between w-full">
        <Link href="/" aria-label="Go back to dashboard">
          <Logo />
        </Link>

        <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 py-2 px-4 hidden lg:block">
          <NavigationMenuItems />
        </div>

        {/* Right side content */}
        <div className="flex items-center gap-x-2">
          {/* Show NavigationButtons only on desktop */}
          <div className="hidden lg:block h-9">
            <NavigationButtons />
          </div>

          {/* Show mobile menu on mobile */}
          <div className="flex items-center gap-x-2 lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
