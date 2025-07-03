import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Thiệp mời | Gửi lời chúc ý nghĩa',
  description: 'Tạo thiệp mời cá nhân hoá với ảnh, QR, và lời chúc. Hỗ trợ gửi email và lưu trữ đám mây. Thiết kế đẹp, dễ sử dụng.',
  keywords: [
    'thiệp mời',
    'gửi thiệp',
    'thiệp chúc mừng',
    'tạo thiệp online',
    'thiệp QR',
    'thiệp sinh nhật',
    'thiệp cưới',
    'thiệp cá nhân hoá',
    'Next.js',
    'ứng dụng web'
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png'
  },
  authors: [{ name: 'phuongdongiot', url: 'https://marketing.dxmd.vn' }],
  creator: 'Tên bạn hoặc nhóm phát triển',
  metadataBase: new URL('https://marketing.dxmd.vn'),
  openGraph: {
    title: 'Thiệp mời | Gửi lời chúc ý nghĩa',
    description: 'Tạo thiệp mời đẹp mắt với ảnh, QR code, và gửi qua email. Hỗ trợ lưu trữ trên đám mây.',
    url: 'https://marketing.dxmd.vn',
    siteName: 'Thiệp Mời',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://marketing.dxmd.vn/og-image.jpg',
        width: 1200,
        height: 1200,
        alt: 'Thiệp mời cá nhân hoá'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp mời | Gửi lời chúc ý nghĩa',
    description: 'Thiệp mời online với ảnh, mã QR, lời chúc và gửi email. Thiết kế đẹp, dễ dùng.',
    creator: '@yourTwitter',
    images: ['https://marketing.dxmd.vn/twitter-image.jpg']
  },
  themeColor: '#ffffff',
  manifest: '/site.webmanifest',
  category: 'application'
}

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
          {children}
      </body>
    </html>
  );
}
