export const getToken = (header: any) => {
  const authHeader = (header['authorization'] || header['Authorization']).split(
    ' ',
  );
  if (authHeader.length !== 2 || authHeader[0] !== 'Bearer') {
    return '';
  }
  return authHeader[1];
};
export const getUnprocessedToken = (header: any) =>
  header['authorization'] || header['Authorization'];
