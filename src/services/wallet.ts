import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchWalletBalance = async (
  token: string | null
): Promise<{ balance: number }> => {
  const res = await axios.get(`${BASE_URL}/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

interface PurchaseCryptoPayload {
  coinSymbol: string;
  quantity: number;
  buyPrice: number;
  totalCost: number;
}

interface PurchaseCryptoSuccess {
  message: string;
  coin: {
    symbol: string;
    quantity: number;
  };
  newWalletBalance: number;
}

export async function purchaseCrypto(
  token: string | null,
  payload: PurchaseCryptoPayload
): Promise<PurchaseCryptoSuccess> {
  try {
    const res = await axios.post<PurchaseCryptoSuccess>(
      `${BASE_URL}/wallet/purchase`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message =
      error.response?.data?.error ?? 'Failed to complete purchase';
    throw new Error(message);
  }
}
