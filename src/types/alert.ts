export type IAlertValiant = 'error' | 'success' | 'warning';

export interface IAlert {
  message: string;
  variant: IAlertValiant;
}
