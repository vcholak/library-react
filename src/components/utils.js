// @ts-ignore
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  const str = date.toLocaleDateString(undefined, options);
  return str;
}
