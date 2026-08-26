export const truncate = (name: string, length = 25) => {
  if (name.length > length) {
    return name.substring(0, length) + "...";
  }
  return name;
};
