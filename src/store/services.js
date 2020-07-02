import axios from '@randomuser/utils/axiosInstance';

export const getNewUser = async () =>
  await axios.get('/api/0.4/?randomapi').then((res) => res.data.results);
