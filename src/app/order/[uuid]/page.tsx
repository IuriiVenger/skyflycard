import { FC } from 'react';

import { orders } from '@/api/orders';
import OrderInfo from '@/components/Orders/OrderInfo';

type SuccessPaymentPageProps = {
  params: { uuid: string };
};

const SuccessPaymentPage: FC<SuccessPaymentPageProps> = async ({ params }) => {
  const { data } = await orders.status.getByUuid(params.uuid);

  return <OrderInfo order={data} />;
};

export default SuccessPaymentPage;
