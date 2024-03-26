import { supportEmail } from '@/constants';

const Contacts = () => (
  <div className="flex w-full justify-center bg-tenant-main">
    <div className="flex max-w-screen-xl items-center gap-5  px-16 py-16 max-md:flex-col max-md:gap-0 max-md:p-5">
      <div className="flex w-2/5 flex-col max-md:ml-0 max-md:w-full">
        <div className="flex flex-col text-lg leading-7 text-white max-md:mt-10">
          <div className="text-4xl font-bold leading-[54px] tracking-tighter">Contacts</div>
          <div className="mt-4 leading-7 text-stone-200">
            Czech Republic Vlka Cryptana s.r.o. (Praha, Praha 9, Kurta Konráda 2517/1, 190 00 Czech Republic) is
            incorporated as a limited liability company, in accordance with Czech Republic law.
            <br />
            Vlka Cryptana s.r.o.company registration number 17664021
          </div>
          <a
            href={`mailto:${supportEmail}`}
            className="mt-4 justify-center self-start whitespace-nowrap rounded bg-black px-3 py-1"
          >
            {supportEmail}
          </a>
        </div>
      </div>
      {/* <div className="ml-5 flex w-3/5 flex-col max-md:ml-0 max-md:w-full">
        <img
          alt="Contacts"
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1454532901647eda0589e903020dc496f0a90fb1f61c5f7f7ff394414cd51c8a?apiKey=73f80fdb1c984aeeab687b7998ab4028&"
          className="aspect-[1.52] w-full flex-shrink-0 rounded-3xl max-md:mt-10 max-md:max-w-full"
        />
      </div> */}
    </div>
  </div>
);

export default Contacts;
