import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, Address } from '@ton/ton';
import TonWeb from 'tonweb';

let client: TonClient | null = null;
let tonweb: TonWeb | null = null;
export const getTonClient = async (): Promise<TonClient> => {
  if (!client) {
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    client = new TonClient({ endpoint });
  }
  return client;
};
export const getTonWeb = async () => {
  if (!tonweb) {
    tonweb = new TonWeb(
      new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
        // apiKey: 'YOUR_TESTNET_TONCENTER_API_KEY',
      })
    );
  }
  return tonweb;
};

export const getStakeList = async function () {
  return [
    {
      address: 'kQAqymw5ia-MrqO2pV2EXSYufylqtirvFbPR65ipNO1WwJuS',
      name: 'TB Test Jetton',
      symbol: 'TBRTJ',
      decimals: '9',
      image:
        'https://cache.tonapi.io/imgproxy/KXdk-PAA7sEjwA9KEoAF0Kzz787T248Y3a2-PTr_niw/rs:fill:200:200:1/g:no/aHR0cHM6Ly9pLnRib29rLmNvbS9sb2dvLnN2Zw.webp',
      description: 'TB Test Jetton',
      testnet: true,
      balance: 0,
      restaking: 0,
      tvl: 0,
    },
  ];
};

export const getTonUSDTPrice = async function () {
  // const url = `https://fapi.binance.com/fapi/v1/ticker/price?symbol=TONUSDT`;
  // return fetch(url).then((res) => res.json());
  return {
    price: 1,
  };
};

export const getTokenBalance = async function (address: Address) {
  const client = await getTonClient();
  return await client.getBalance(address);
};