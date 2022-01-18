import localStorageFallback from 'local-storage-fallback';

const storagePrefix = 'phedon_';

const storage = {
  getToken: () => JSON.parse(localStorageFallback.getItem(`${storagePrefix}token`) as string),
  setToken: (token: string) => {
    localStorageFallback.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    localStorageFallback.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
