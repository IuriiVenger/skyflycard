import { FC } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

const LandingFooter: FC = () => (
  <footer className="flex items-center justify-center self-stretch bg-black px-16 py-10 max-md:px-5 md:py-20">
    <div className="flex w-full max-w-screen-xl flex-col">
      <div className="flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/09857169d98be9ab445ed53100b9a0d2dcf91fe7577726a83283d16c06171b03?apiKey=73f80fdb1c984aeeab687b7998ab4028&"
          alt="Company Logo"
          className="aspect-[4.55] w-36 max-w-full shrink-0"
        />
        <nav className="flex gap-3">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6eadc65ef25c83b063d0cded7b99877e736911bd5f5a7a1813dc22eb11223ed1?apiKey=73f80fdb1c984aeeab687b7998ab4028&"
            alt="Feature Icon 1"
            className="aspect-square w-8 shrink-0"
          />
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3121c9658dcde6daa99988fff0ad580bc976426f3e9ea2f43c0d851b66aedd9a?apiKey=73f80fdb1c984aeeab687b7998ab4028&"
            alt="Feature Icon 2"
            className="aspect-square w-8 shrink-0"
          />
        </nav>
      </div>
      <section className="mt-16 text-xs leading-5 text-white max-md:mt-10 max-md:max-w-full">
        2023 © All rights reserved
        <p>
          Piastra Pay – a limited liability company registred in Poland with registration number 520307010 and a license
          in the Register of Payment Services of Poland under number MIP 155/2022
        </p>
      </section>
    </div>
  </footer>
);

export default LandingFooter;
