export const getToken = (header: any) =>
  (header['authorization'] || header['Authorization']).split(' ')[1];
export const getUnprocessedToken = (header: any) =>
  header['authorization'] || header['Authorization'];
