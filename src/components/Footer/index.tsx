import { FC } from 'react';

import logo from '@/assets/svg/footer_logo.svg';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

const Footer: FC = () => (
  <footer className="flex items-center justify-center self-stretch bg-black px-16 py-10 max-md:px-5 md:py-20">
    <div className="flex w-full max-w-screen-xl flex-col">
      <div className="flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <Image src={logo.src} alt="Company Logo" className="aspect-[4.55] w-36 max-w-full shrink-0" />
      </div>
      <section className="mt-16 text-xs leading-5 text-white max-md:mt-10 max-md:max-w-full">
        2024 © All rights reserved
        <p>
          Czech Republic Vlka Cryptana s.r.o. (Praha, Praha 9, Kurta Konráda 2517/1, 190 00 Czech Republic) is
          incorporated as a limited liability company, in accordance with Czech Republic law.
        </p>
      </section>
    </div>
  </footer>
);

export default Footer;
