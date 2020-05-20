import axios from 'axios';

export const checkIfAuthorised = () => {
  console.log('checkIfAuthorised');
  const oldRefreshToken = localStorage.getItem('refresh_token');

  return axios.post(`${window.hostname}/auth/refresh-token`, {
    refresh_token: oldRefreshToken,
  })
    .then((response) => {
      console.log('checkIfAuthorised true');
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      localStorage.setItem('access_token', `Bearer ${accessToken}`);
      localStorage.setItem('refresh_token', refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    })
    .catch((err) => {
      console.log('checkIfAuthorised false');
      throw err;
    });
};
