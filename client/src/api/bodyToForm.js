export const bodyToForm = (body) => {
  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }
  return formData;
};
