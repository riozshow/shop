export const saveLocalStorage = (name: string, object: any) => {
  localStorage.setItem(name, JSON.stringify(object));
};

export const loadLocalStorage = (name: string) => {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  }
};

export const deleteLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};
