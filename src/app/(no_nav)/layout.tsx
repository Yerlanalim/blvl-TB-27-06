import { InterFont, SatoshiFont, UbuntuFont } from '../styles/fonts/font';
import '../globals.css';
import { ReactQueryClientProvider } from '@/components/shared/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <div
        className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Scrollable content */}
        <main>{children}</main>
        <Toaster className="bg-black" />
      </div>
    </ReactQueryClientProvider>
  );
}
