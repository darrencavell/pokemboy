const localStorage = {
  add: (key, value) => {
    if (typeof window === 'undefined') return;
    return window.localStorage.setItem(key, value);
  },
  remove: (key) => {
    if (typeof window === 'undefined') return;
    return window.localStorage.removeItem(key);
  },
  get: (key) => {
    if (typeof window === 'undefined') return;
    return window.localStorage.getItem(key);
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    return window.localStorage.clear();
  }
}

export default localStorage;
