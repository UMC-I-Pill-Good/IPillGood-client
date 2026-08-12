export const isSupplementAddReturnPath = (pathname: string) =>
  pathname === '/cabinet/supplement-add' ||
  /^\/product\/[^/]+$/.test(pathname) ||
  pathname === '/reviews' ||
  /^\/ingredient\/[^/]+$/.test(pathname);
