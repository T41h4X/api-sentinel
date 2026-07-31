/** Shared, framework-neutral types used at application boundaries. */
export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  roles: string[];
}
export interface ApiError {
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
}
