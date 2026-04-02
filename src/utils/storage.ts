export const storage = {
  getItem: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      console.error(`Error reading from localStorage: ${key}`);
      return null;
    }
  },

  setItem: (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error writing to localStorage: ${key}`);
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error(`Error removing from localStorage: ${key}`);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch {
      console.error('Error clearing localStorage');
    }
  }
};

export const sessionStorage = {
  getItem: (key: string) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      console.error(`Error reading from sessionStorage: ${key}`);
      return null;
    }
  },

  setItem: (key: string, value: unknown) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Error writing to sessionStorage: ${key}`);
    }
  },

  removeItem: (key: string) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      console.error(`Error removing from sessionStorage: ${key}`);
    }
  }
};
