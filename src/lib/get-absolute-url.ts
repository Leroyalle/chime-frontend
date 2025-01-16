export const getAbsoluteUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${url}`;
};
