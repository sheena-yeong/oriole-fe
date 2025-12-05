import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCoins = async (token: string | null) => {
  try {
    const res = await axios.get(`${BASE_URL}/coins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
