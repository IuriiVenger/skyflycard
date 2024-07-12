'use client';

import { SDKProvider } from '@telegram-apps/sdk-react';

import MiniApp from '@/components/Mini-App';

// import { initMiniApp } from '@telegram-apps/sdk';
// import { useState } from 'react';

const MiniAppPage = () => (
  <SDKProvider>
    <MiniApp />
  </SDKProvider>
);

export default MiniAppPage;
