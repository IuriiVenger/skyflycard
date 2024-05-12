import Link from 'next/link';
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
    <div className="flex w-full max-w-screen-xl flex-col gap-16">
      <div className="flex w-full justify-between gap-5 gap-y-16 max-md:max-w-full max-md:flex-wrap">
        <Image src={logo.src} alt="Company Logo" className="aspect-[4.55] w-36 max-w-full shrink-0" />
        <div className="flex gap-4 text-white">
          <Link className="hover:opacity-80" href="/terms">
            Terms of Service
          </Link>
          <Link className="hover:opacity-80" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:opacity-80" href="/aml">
            AML/KYC
          </Link>
        </div>
      </div>
      <section className="text-xs leading-5 text-white max-md:max-w-full">
        2024 © All rights reserved
        <div className="mt-2 opacity-60">
          <p>
            Czech Republic Vlka Cryptana s.r.o. (Praha, Praha 9, Kurta Konráda 2517/1, 190 00 Czech Republic) is
            incorporated as a limited liability company, in accordance with Czech Republic law.
          </p>
          <p>
            Crypto exchanges services provided by Vlka Cryptana s.r.o. (registration number 176 640 21) Kurta Konráda
            2517/1, Liben, 190 00 Prague 9
          </p>
          <p>
            The website www.vpwallet.io is owned and operated by Vlka Cryptana s.r.o. (registration number 176 640 21)
            Kurta Konráda 2517/1, Liben, 190 00 Prague 9
          </p>
        </div>
      </section>
    </div>
  </footer>
);

export default Footer;
