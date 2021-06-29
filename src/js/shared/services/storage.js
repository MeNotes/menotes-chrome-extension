class BaseStorageService {
  get(key) {
    throw new Error("method should be implemented");
  }

  set(key, value) {
    throw new Error("method should be implemented");
  }

  remove(key) {
    throw new Error("method should be implemented");
  }

  clear() {
    throw new Error("method should be implemented");
  }
}

class LocalStorageService extends BaseStorageService {
  get(key) {
    return new Promise((resolve) => {
      const item = localStorage.getItem(key);
      if (item === undefined || item === null) {
        return item;
      }

      resolve(JSON.parse(item));
    });
  }

  set(key, value) {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  }

  remove(key) {
    return new Promise((resolve) => {
      resolve(localStorage.removeItem(key));
    });
  }

  clear() {
    return new Promise((resolve) => {
      localStorage.clear();
      resolve();
    });
  }
}

class ChromeStorageService extends BaseStorageService {
  get(key) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key]);
      });
    });
  }

  set(key, value) {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  }

  remove(key) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, () => {
        resolve();
      });
    });
  }

  clear() {
    return new Promise((resolve) => {
      chrome.storage.local.clear(() => {
        resolve();
      });
    });
  }
}

export const StorageService = Boolean(chrome.storage)
  ? ChromeStorageService
  : LocalStorageService;
