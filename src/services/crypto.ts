import axios from 'axios';
import type { watchListCoin } from '../../types/coins';

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
  coins: watchListCoin[]
) => {
  try {
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
