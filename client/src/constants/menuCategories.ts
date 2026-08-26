export const MENU_CATEGORIES = [
  "Appetizers",
  "Soups & Salads",
  "Main Courses",
  "Desserts",
  "Beverages",
  "Combos & Set Menus",
] as const;

export const categoryPath = (category: string) => `/menu/category/${encodeURIComponent(category)}`;
