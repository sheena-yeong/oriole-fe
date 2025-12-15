import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type createPaymentIntentFn = (
  token: string | null,
  fiatAmount: number,
) => Promise<
  | { success: true; data: { clientSecret: string; paymentIntentId: number } }
  | { success: false; error: string }
>;

export const createPaymentIntent: createPaymentIntentFn = async (
  token,
  fiatAmount,
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/payment/create-intent`,
      {
        amount: fiatAmount,
        currency: 'usd',
        metadata: {
          type: 'wallet_topup',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data?.clientSecret) {
      return { success: true, data: res.data };
    }
    return { success: false, error: 'Failed to create Payment Intent' };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : 'Failed to create Payment Intent.',
    };
  }
};