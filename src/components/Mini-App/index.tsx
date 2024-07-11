import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';

const MiniApp = () => {
  const [contacts, setContacts] = useState<any>();
  const [initialData, setInitialData] = useState<Record<string, string>>();
  useEffect(() => {
    // const [miniApp] = InitData();
    // miniApp.requestContact().then((contact) => {
    //   console.log(contact);
    //   setContacts(contact);
    // });
    const { initData } = retrieveLaunchParams();
    console.log(initData);
  }, []);

  return (
    <div>
      <h1>Mini App</h1>

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
