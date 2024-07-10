import { initMiniApp } from '@telegram-apps/sdk';
import { useState } from 'react';

const MiniApp = () => {
  const [miniApp] = initMiniApp();
  const [contacts, setContacts] = useState<any>();

  miniApp.requestContact().then((contact) => {
    console.log(contact);
    setContacts(contact);
  });
  return (
    <div>
      <h1>Mini App</h1>
      {JSON.stringify(contacts)}
    </div>
  );
};

export default MiniApp;
