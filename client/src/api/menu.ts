import { http } from "../lib/http";
import { MenuItem, Paginated } from "../type";

export interface MenuQuery {
  page?: number;
  isChefSpecial?: boolean;
  category?: string;
  name?: string;
}

export const fetchMenuItems = (query: MenuQuery) => {
  const params = new URLSearchParams();
  if (query.page) params.set("page", String(query.page));
  if (query.isChefSpecial) params.set("is_chef_special", "true");
  if (query.category) params.set("category", query.category);
  if (query.name) params.set("name", query.name);

  return http.get<Paginated<MenuItem>>(`/api/menu?${params.toString()}`).then((response) => response.data);
};

export const fetchMenuItem = (id: string) =>
  http.get<{ menu_item: MenuItem }>(`/api/menu/${id}`).then((response) => response.data.menu_item);
