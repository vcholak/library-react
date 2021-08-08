// @ts-ignore
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  const str = date.toLocaleDateString(undefined, options);
  return str;
}

export const toISOStr = (dateStr) => {
  const date = new Date(dateStr);
  //RFC 3339 format
  const str = date.toISOString();
  return str;
}
