export type LogAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'USER_ROLE_UPDATED'
  | 'USER_STATUS_UPDATED'
  | 'ANNOUNCEMENT_CREATED'
  | 'ANNOUNCEMENT_UPDATED'
  | 'ANNOUNCEMENT_DELETED'
  | 'PASSWORD_CHANGED';

export interface Log {
  id: string;
  userId: string;
  userEmail?: string;
  action: LogAction;
  target?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
