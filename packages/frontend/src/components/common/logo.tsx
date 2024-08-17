import Image from 'next/image';
import LogoSrc from '@/../public/logo.svg';

export function Logo({
  className = '',
  alt = 'logo'
}: {
  className?: string;
  alt?: string;
}) {
  return <Image src={LogoSrc} alt={alt} className={`${className}`} />;
}
