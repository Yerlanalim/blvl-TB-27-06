import { ReactQueryClientProvider } from '@/components/shared/react-query-client-provider';
import { OnestFont } from './styles/fonts/font';
import { UbuntuFont } from './styles/fonts/font';
import { SatoshiFont } from './styles/fonts/font';
import { InterFont } from './styles/fonts/font';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://bizlevel.kz'),
  title: {
    default: 'BizLevel - Обучение бизнесу',
    template: '%s | BizLevel'
  },
  description: 'Платформа для изучения основ бизнеса и предпринимательства',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="ru">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} ${UbuntuFont.variable} ${OnestFont.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
