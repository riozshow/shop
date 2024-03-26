export const validators: { [key: string]: Function } = {
  email: (val: string) =>
    new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(val),
  password: (val: string) => new RegExp(/.{8}$/).test(val),
  percent: (val: string) => Number(val) > 0 && Number(val) < 100,
  date: (val: Date) => val && Date.now() < new Date(val).getTime(),
  name: (val: string) =>
    new RegExp(/(?=.{3,16}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
  description: (val: string) => new RegExp(/^[\S\s]{20,1000}$/).test(val),
  price: (val: number) => Number(val) > 0,
  address: (val: string) =>
    new RegExp(/(?=.{3,16}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
  passwordRepeat: (val: string, form: { password: string }) =>
    val.length > 0 && form.password === val,
  phone: (val: string) => val.length >= 6 && val.length <= 16,
  street: (val: string) =>
    new RegExp(/(?=.{1,30}$)(?=[a-zA-Z0-9_-ółćśżźąę]*$)/).test(val),
  number: (val: string) =>
    new RegExp(/(?=.{1,10}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
  postalCode: (val: string) =>
    new RegExp(/(?=.{3,10}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
  city: (val: string) =>
    new RegExp(/(?=.{3,30}$)(?=[a-zA-Z0-9_-ółćśżźąę]*$)/).test(val),
  tag: (val: string) => new RegExp(/(?=.{3,16}$)(?=[a-zA-Z0-9_-]*$)/).test(val),
};
