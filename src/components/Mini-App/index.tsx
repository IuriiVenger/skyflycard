import { mockTelegramEnv } from '@telegram-apps/sdk';
import { useInitData, useInitDataRaw, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const MiniApp = () => {
  const [contacts, setContacts] = useState<any>();
  const [initialData, setInitialData] = useState<Record<string, string>>();
  const launchParams = useLaunchParams(true);

  useEffect(() => {
    // const [miniApp] = InitData();
    // miniApp.requestContact().then((contact) => {
    //   console.log(contact);
    //   setContacts(contact);
    // });
    console.log(localStorage.getItem('initData'));
    localStorage.setItem('initData', JSON.stringify(launchParams?.initDataRaw));
    console.log(localStorage.getItem('initData'));
  }, []);

  // const initDataRaw = new URLSearchParams([
  //   [
  //     'user',
  //     JSON.stringify({
  //       id: 99281932,
  //       first_name: 'Andrew',
  //       last_name: 'Rogue',
  //       username: 'rogue',
  //       language_code: 'en',
  //       is_premium: true,
  //       allows_write_to_pm: true,
  //     }),
  //   ],
  //   ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
  //   ['auth_date', '1716922846'],
  //   ['start_param', 'debug'],
  //   ['chat_type', 'sender'],
  //   ['chat_instance', '8428209589180549439'],
  // ]).toString();

  // mockTelegramEnv({
  //   themeParams: {
  //     accentTextColor: '#6ab2f2',
  //     bgColor: '#17212b',
  //     buttonColor: '#5288c1',
  //     buttonTextColor: '#ffffff',
  //     destructiveTextColor: '#ec3942',
  //     headerBgColor: '#17212b',
  //     hintColor: '#708499',
  //     linkColor: '#6ab3f3',
  //     secondaryBgColor: '#232e3c',
  //     sectionBgColor: '#17212b',
  //     sectionHeaderTextColor: '#6ab3f3',
  //     subtitleTextColor: '#708499',
  //     textColor: '#f5f5f5',
  //   },
  //   initData: parseInitData(initDataRaw),
  //   initDataRaw,
  //   version: '7.2',
  //   platform: 'tdesktop',
  // });

  const initData = useInitDataRaw(true);

  const miniApp = useMiniApp(true);
  miniApp && miniApp.requestContact().then((contact) => console.log('contact', contact));

  return (
    <div>
      {/* <Script src="https://telegram.org/js/telegram-web-app.js" /> */}
      <h1>{launchParams && JSON.stringify(launchParams?.initDataRaw)}</h1>

      {/* {initData &&
        (initData as Array<[string, string]>).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: {value}
          </div>
        ))} */}
    </div>
  );
};

export default MiniApp;
