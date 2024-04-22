import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const fontHeading = localFont({
  src: './Adamina-Regular.ttf',
  variable: '--font-heading'
});

export const fontSubheading = localFont({
  src: './Ramabhadra-Regular.ttf',
  variable: '--font-subheading'
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});
