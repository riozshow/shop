import { AxiosInstance } from 'axios';

export type Id = string;
export type Form = { [key: string]: any };

type Callers = {
  read: () => any;
  create: (form: Form) => any;
  update: (form: { id: Id; [key: string]: any }) => any;
  delete: (id: string) => any;
};

export function generateCRUD(api: AxiosInstance, path: string): Callers {
  const callers: Callers = {
    read: () => api.get(path),
    create: (form: Form) => api.post(path, form),
    update: ({ id, ...form }: { id: Id; [key: string]: any }) =>
      api.patch(`${path}/` + id, form),
    delete: (id: Id) => api.delete(`${path}/` + id),
  };

  return callers as any;
}
