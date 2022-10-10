import { defineStore } from 'pinia';

const BASE_URL = process.env.VUE_APP_API_URL;

export const makeURL = (
  path: string,
  query: Record<string, string>
): string => {
  const url = new URL(`${BASE_URL}/${path}`);
  if (url.pathname.endsWith('/')) {
    url.pathname = url.pathname.substring(0, url.pathname.length - 1);
  }
  url.search = new URLSearchParams(query).toString();
  return url.toString();
};

const normalisePath = (path: string) => path.replace(/^\/?api\//, '');

export const useApi = defineStore('api', {
  actions: {
    async request<T>(config: any): Promise<T> {
      const {
        method = 'GET',
        path = '',
        body = null,
        query = {},
        headers = {
          'Content-Type': 'application/json',
        },
      } = config;

      try {
        const response = await fetch(makeURL(normalisePath(path), query), {
          headers,
          method,
          body,
        });

        const result = await response.clone().json();

        return Promise.resolve(result);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});
