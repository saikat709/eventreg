export interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  age: number;
  institution: string;
  tShirtSize: 'sm' | 'l' | 'xl' | 'xxl';
  password?: string;
}
