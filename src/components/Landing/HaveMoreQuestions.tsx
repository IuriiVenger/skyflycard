import { Button } from '@nextui-org/react';

import { mailToSupport } from '@/utils/helpers';

const HaveMoreQuestions = () => (
  <section className=" flex w-full items-center justify-center bg-tenant-main py-6 sm:py-12">
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-20">
      <h3 className="self-center whitespace-nowrap text-center text-3xl font-bold leading-[54px] tracking-tighter text-white sm:text-4xl">
        Have more questions?
      </h3>

      <Button onClick={mailToSupport} className="bg-white px-12" radius="sm" size="lg">
        Contact us
      </Button>
    </div>
  </section>
);

export default HaveMoreQuestions;
