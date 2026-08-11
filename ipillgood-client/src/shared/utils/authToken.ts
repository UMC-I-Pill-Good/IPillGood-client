type JwtPayload = Record<string, unknown>;

const ADMIN_ROLE_SET = new Set(['ADMIN', 'ROLE_ADMIN']);
const ROLE_CLAIM_KEYS = [
  'role',
  'roles',
  'authority',
  'authorities',
  'scope',
  'scp',
  'memberRole',
  'userRole',
] as const;

const decodeJwtPayload = (token: string): JwtPayload | null => {
  const encodedPayload = token.split('.')[1];
  if (!encodedPayload) return null;

  try {
    const normalizedPayload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      '=',
    );

    return JSON.parse(atob(paddedPayload)) as JwtPayload;
  } catch {
    return null;
  }
};

const getRoleList = (value: unknown): string[] => {
  if (typeof value === 'string') {
    return value
      .split(/[\s,]+/)
      .map((role) => role.trim().toUpperCase())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value.flatMap(getRoleList);
  }

  return [];
};

export const isAdminAccessToken = (token: string | null): boolean => {
  if (!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  return ROLE_CLAIM_KEYS.some((key) =>
    getRoleList(payload[key]).some((role) => ADMIN_ROLE_SET.has(role)),
  );
};
