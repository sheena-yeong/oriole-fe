import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  token: string | null
) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/change-password`,
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message ?? 'Request failed');
    }
    throw err;
  }
};
