import {ChangeEvent} from 'react';

export interface UserFormDataTemplate {
  label: string;
  initialValue: string;
  onChange: (e: string | ChangeEvent<any>) => void;
  error?: string;
  secure: boolean;
}
