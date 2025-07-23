export const extractToken = (header: string): string | null => {
  const parts = header.split(' ');

  if (parts[0] !== 'Bearer') {
    return null;
  }
  return parts[1];
};
