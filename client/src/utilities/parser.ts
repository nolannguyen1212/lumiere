// Dish descriptions use an em dash as the section separator convention.
export const parseDescription = (description: string): string[] =>
  description.split("\n").flatMap((section) => section.split("—"));
