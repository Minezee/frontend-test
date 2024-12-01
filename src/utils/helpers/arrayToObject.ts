export const arrayToObject = (data: string[]) => {
  const categoryOptions = data?.map((category) => ({
    name: category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
    value: category,
  }));

  return categoryOptions;
}
