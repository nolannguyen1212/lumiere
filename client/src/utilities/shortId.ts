export const shortId = (id: string) => id.replace(/-/g, "").slice(0, 8).toUpperCase();
