import axios from 'axios';
import type { CoinIdOnly } from '../../types/coins';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCoins = async (token: string | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/coins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.log('Failed to fetch coins', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unable to fetch coins.',
    };
  }
};

export const addWatchListCoins = async (
  token: string | null,
  coins: CoinIdOnly[]
) => {
  try {
    console.log('addWatchListcoins frontend', coins);
    const res = await axios.post(`${BASE_URL}/coins/watchlist`, coins, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.error('Failed to add watchlist coins:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An error occurred.',
    };
  }
};

export const getWatchListCoins = async (token: string | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/watchlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.log('Failed to fetch coins from watchlist', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unable to fetch coins.',
    };
  }
};

export const deleteWatchListCoins = async (
  token: string | null,
  id: string
) => {
  try {
    const res = await axios.delete(`${BASE_URL}/coins/watchlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.log('Failed to delete coins from watchlist', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unable to delete coins.',
    };
  }
};

export const getMarketChart = async (token: string | null, coinId: string, days: number = 7) => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/${coinId}/market-chart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        days,
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.log('Failed to fetch market chart.', err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : 'Unable to fetch market chart coins.',
    };
  }
};

export const getFearGreedLatest = async (token: string | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/fear-greed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: res.data };
  } catch (err) {
    console.log('Failed to fetch fear greed index.', err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : 'Unable to fetch fear greed index.',
    };
  }
};