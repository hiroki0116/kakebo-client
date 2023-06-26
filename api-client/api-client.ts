import axios, { AxiosInstance } from 'axios';
import Router from 'next/router';
import { auth } from '@/lib/firabase';
import { getCookie, setCookie, isAuth } from '@/lib/authFunctions';
declare module 'axios' {
  export interface AxiosRequestConfig {
    errorHandle?: boolean;
  }
}

const API: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});

const APIWithoutAuth: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});

// add token to header if currentUser is logged-in
API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = (await auth.currentUser?.getIdToken()) as string;
    setCookie('token', token);
    config.headers = { 'x-auth-token': token };
    return config;
  } else if (isAuth()) {
    const token = getCookie('token') as string;
    config.headers = { 'x-auth-token': token };
    return config;
  } else {
    // no way to get token
    return config;
  }
});

// check for errorHandle config
const errorResponseHandler = (error: any) => {
  if (
    error.config.hasOwnProperty('errorHandle') &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }

  // if has response show the error
  if (error.response) {
    const status = error.response.status;
    if (status === 404) {
      return Router.push('/404');
    } else if (status === 500) {
      return Router.push('/500');
    } else if (status === 401 || status == 403) {
      return Router.push('/403');
    } else {
      console.error(error.response.data.message);
      return Promise.reject(error);
    }
  }
};

API.interceptors.response.use((response) => response, errorResponseHandler);

export { APIWithoutAuth, API };
