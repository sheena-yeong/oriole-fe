import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchUserPortfolio = (token: string | null) => {
  try {
    const res = axios.get(`${BASE_URL}/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Unable to fetch wallet balance.',
    };
  }
};