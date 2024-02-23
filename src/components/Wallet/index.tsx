import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { FC } from 'react';

import { API } from '@/api/types';
import { prettyId, roundToDecimals } from '@/utils/converters';

type WalletProps = {
  wallet: API.Wallets.Wallet;
};

const Wallet: FC<WalletProps> = ({ wallet }) => (
  <Card className="min-h-60 max-w-sm  bg-light-blue-gradient p-4 text-white" fullWidth radius="sm">
    <CardHeader>Wallet {prettyId(wallet.uuid)}</CardHeader>
    <CardBody>
      {wallet.balance.map(({ amount, crypto, uuid }) => (
        <div className="text-end" key={uuid}>
          <span className="mr-1">{roundToDecimals(amount)}</span>
          <strong>{crypto.name}</strong>
        </div>
      ))}
    </CardBody>
    <CardFooter>
      <p className="uppercase">{wallet.type}</p>
    </CardFooter>
  </Card>
);

export default Wallet;
