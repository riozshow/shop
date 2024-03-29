export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  address?: string;
  phone?: number;
  type: boolean;
};

export type OrderProduct = {
  id: string;
  amount: number;
  message?: string;
};

export type Order = {
  addressId: string;
  products: OrderProduct[];
  couponName?: string;
  message?: string;
};
