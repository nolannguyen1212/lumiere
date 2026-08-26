export interface UserLoginPayload {
  email: string;
  password: string;
}

export type Gender = "M" | "FM" | "N";

export interface UserSignupPayload {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  firstname: string;
  lastname: string;
  date_of_birth: string;
  gender: Gender | "";
  phone: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: "customer" | "admin";
  is_active: boolean;
  date_joined: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string | null;
  image_upload_url: string;
  is_chef_special: boolean;
  category: string;
  available: boolean;
  description: string;
  updated_by: string | null;
}

export interface OrderItem {
  id: string;
  menu_item: string;
  order: string;
  quantity: number;
  date_added: string;
  name: string;
  unit_price: number;
  total_price: number;
  image_upload_url: string | null;
}

export interface Order {
  id: string;
  user: string | null;
  date_ordered: string;
  formatted_date_ordered: string | null;
  complete: boolean;
  items: OrderItem[];
  total: number;
}

export interface Notification {
  id: string;
  kind: "order" | "info";
  message: string;
  order: string | null;
  read: boolean;
  created_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
