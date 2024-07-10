import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';

const MiniApp = () => {
  const [contacts, setContacts] = useState<any>();
  const [initData, setInitData] = useState<any>();

  useEffect(() => {
    // const [miniApp] = InitData();
    // miniApp.requestContact().then((contact) => {
    //   console.log(contact);
    //   setContacts(contact);
    // });
    const launchParams = retrieveLaunchParams();
    setInitData(launchParams.initData);
  }, []);

  return (
    <div>
      <h1>Mini App</h1>
      {JSON.stringify(contacts)}
      {JSON.stringify(initData)}
    </div>
  );
};

export default MiniApp;
