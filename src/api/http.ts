import axios, { AxiosInstance } from 'axios';
import ApiConstant from './apiConstant';
import { getRefreshToken } from './auth.api';

class Http {
  instance: AxiosInstance;
  accessToken = localStorage.getItem('accessToken');
  refreshToken = localStorage.getItem('refreshToken');

  constructor() {
    this.instance = axios.create({
      baseURL: ApiConstant.BASE_API_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        refreshToken: this.refreshToken,
      },
    });
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        //lấy lại token khi hết hạn
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
          const refreshToken = userInfo?.refreshToken;

          try {
            const { data } = await getRefreshToken(refreshToken as string);
            userInfo.refreshToken = data.refresh_token;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Lỗi khi làm mới access token:', refreshError);
          }
        }

        //khi refresh token cũng hết hạn
        if (
          error?.response?.status === 402 &&
          !error?.response?.data?.refresh
        ) {
          localStorage.clear();
          window.location.href = '/auth/signin';
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
