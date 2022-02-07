export type AlertValiant = 'error' | 'success' | 'warning';

export interface Alert {
  message: string;
  variant: AlertValiant;
}
