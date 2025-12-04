import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCoins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/coins`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
