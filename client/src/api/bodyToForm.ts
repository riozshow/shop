export const bodyToForm = (body: { [key: string]: any }) => {
  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }
  return formData;
};
