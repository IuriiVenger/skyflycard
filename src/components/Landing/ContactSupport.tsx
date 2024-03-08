import { FC } from 'react';

const ContactSupport: FC = () => (
  <div className="flex items-center justify-center self-stretch bg-white px-16 py-16 max-md:px-5">
    <div className="w-full max-w-screen-xl">
      <div className="flex gap-5 max-md:flex-col-reverse max-md:gap-0">
        <div className="flex w-[70%] max-w-screen-sm flex-col max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
            <p className="text-4xl font-bold leading-[54px] tracking-tighter text-green-700 max-md:max-w-full">
              Legendary customer support: <span className="text-green-700">24/7</span>
            </p>
            <p className="mt-4 text-lg leading-7 text-neutral-500 max-md:max-w-full">
              No matter where you are on your crypto journey, our customer support team is a simple tap away!
            </p>
          </div>
        </div>
        <div className="ml-5 flex w-[30%] flex-col max-md:ml-0 max-md:w-full">
          <img
            alt="Legendary customer support"
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff9eb3a463ab2e87343b2949a5abb466125af7e4bf8c4c45105e0268f4553b9d?apiKey=73f80fdb1c984aeeab687b7998ab4028&"
            className="aspect-square w-full self-center max-md:mt-10 max-md:max-w-[50%]"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactSupport;
