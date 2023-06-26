import { NextRouter } from 'next/router';
import cookie from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  if (typeof window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const setLocalStorage = (key: string, value: string) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const saveUserAndToken = (user: any, token: string) => {
  setCookie('token', token);
  setLocalStorage('user', user);
  setLocalStorage('registered', user?.createdAt);
};

export const getCookie = (key: string, req?: any) => {
  return cookie.get(key);
};

export const currAuthUser = () => {
  if (typeof window) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      const userString: any = localStorage.getItem('user');

      if (userString && userString !== 'undefined') {
        const userObj = JSON.parse(userString);
        return userObj;
      }
      return undefined;
    }
  }
  return undefined;
};

export const isAuth = () => currAuthUser() !== undefined;

export const removeCookie = (key: string) => {
  if (typeof window) {
    cookie.remove(key);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window) {
    localStorage.removeItem(key);
  }
};

export const logout = (router: NextRouter) => {
  removeCookie('token');
  router.push('/');
};
