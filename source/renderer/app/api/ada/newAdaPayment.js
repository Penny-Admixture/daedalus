// @flow
import type { AdaTransaction, RequestConfig } from './types';
import { request } from './lib/request';

export type NewAdaPaymentParams = {
  sender: string,
  receiver: string,
  amount: string,
  password: ?string,
  // "groupingPolicy" - Spend everything from the address
  // "OptimizeForSize" for no grouping
  groupingPolicy: ?'OptimizeForSecurity' | 'OptimizeForSize',
};


export const newAdaPayment = (
  config: RequestConfig,
  { sender, receiver, amount, groupingPolicy, password }: NewAdaPaymentParams
): Promise<AdaTransaction> => (
  request({
    hostname: 'localhost',
    method: 'POST',
    path: `/api/txs/payments/${sender}/${receiver}/${amount}`,
    port: config.port,
    ca: config.ca,
  }, { passphrase: password }, { groupingPolicy })
);
