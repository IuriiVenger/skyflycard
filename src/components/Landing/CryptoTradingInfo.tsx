import { Button } from '@nextui-org/react';
import { FC } from 'react';

import cryptoExchange from '@/assets/svg/crypto-exchange.svg';
import { mailToSupport } from '@/utils/helpers';

interface FeatureItemProps {
  text: string;
}

const FeatureItem: FC<FeatureItemProps> = ({ text }) => (
  <div className="flex gap-2">
    <div className="my-auto h-2 w-2 shrink-0 bg-black" />
    <div className="grow">{text}</div>
  </div>
);

// interface SocialIconProps { hide contact us icons
//   src: string;
//   alt: string;
// }

// const SocialIcon: FC<SocialIconProps> = ({ src, alt }) => ( hide contact us icons
//   <img loading="lazy" src={src} alt={alt} className="aspect-square w-12 shrink-0" />
// );

const CryptoTradingInfo: FC = () => {
  const featureItems = [
    { id: 1, text: '$5,000 minimum trade value' },
    { id: 2, text: 'Up to $100,000 per day with regular KYC' },
    { id: 3, text: 'Up to $1,000,000 per day with full KYC+EDQ' },
  ];

  // const socialIcons = [ hide contact us icons
  //   {
  //     id: 1,
  //     src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9491279507174348628648f8709f9def39f184b8c8b0c5858d5c9616e6c19777?apiKey=73f80fdb1c984aeeab687b7998ab4028&',
  //     alt: 'Social Platform 1',
  //   },
  //   {
  //     id: 2,
  //     src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/33994595607cd53747af16ff0ed78455de8dead7d9b66dfc51e6434d7570d4e2?apiKey=73f80fdb1c984aeeab687b7998ab4028&',
  //     alt: 'Social Platform 2',
  //   },
  // ];

  return (
    <div className="flex items-center justify-center self-stretch bg-white px-16 py-16 max-md:px-5">
      <div className="w-full max-w-screen-xl">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <section className="flex w-[46%] flex-col max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src={cryptoExchange.src}
              alt="OTC Crypto Trading"
              className="aspect-[0.94] w-full max-w-[50%] grow self-center md:mt-10 md:max-w-sm"
            />
          </section>
          <section className="ml-5 flex w-[54%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
              <h1 className="text-4xl font-bold leading-[54px] tracking-tighter text-orange-600 max-md:max-w-full">
                Meet the VPWallet <span className="text-orange-600">OTC</span>
              </h1>
              <p className="mt-4 text-lg leading-7 text-neutral-500 max-md:max-w-full">
                VPWallet OTC streamlines the trading of crypto assets directly, circumventing cryptocurrency exchanges
                to mitigate slippage. We deliver profound liquidity and tailored services to organizations and
                high-net-worth individuals. <br />
                VPWallet offers OTC trading services for leading assets, including Bitcoin, Ethereum, USDT, USDC, DAI,
                Tron, and more.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap justify-between gap-5 self-start text-base font-bold leading-7 tracking-tight text-black sm:whitespace-nowrap">
              {featureItems.map((item) => (
                <FeatureItem key={item.id} text={item.text} />
              ))}
            </div>
            <div className="mt-8 flex justify-between gap-5 pr-20 max-md:flex-wrap max-md:pr-5">
              <Button
                onClick={mailToSupport}
                color="success"
                className="grow justify-center whitespace-nowrap rounded  px-6 py-3 text-center text-sm font-semibold leading-6 text-white max-md:px-5"
              >
                Submit request
              </Button>
              {/* <p className="my-auto hidden flex-shrink-0 whitespace-nowrap text-base leading-7 text-neutral-500 sm:block"> hide contact us icons
                or contact us
              </p>
              <div className="flex flex-shrink-0 gap-2">
                {socialIcons.map((icon) => (
                  <SocialIcon key={icon.id} src={icon.src} alt={icon.alt} />
                ))}
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CryptoTradingInfo;
