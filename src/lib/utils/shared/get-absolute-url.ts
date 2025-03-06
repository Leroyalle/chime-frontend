export const getAbsoluteUrl = (url: string | null | undefined) => {
  if (!url) {
    return undefined;
  }

  return `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${url}`;
};
