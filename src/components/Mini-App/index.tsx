import { initMiniApp } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';

const MiniApp = () => {
  const [contacts, setContacts] = useState<any>();

  useEffect(() => {
    const [miniApp] = initMiniApp();
    miniApp.requestContact().then((contact) => {
      console.log(contact);
      setContacts(contact);
    });
  }, []);

  return (
    <div>
      <h1>Mini App</h1>
      {JSON.stringify(contacts)}
    </div>
  );
};

export default MiniApp;
