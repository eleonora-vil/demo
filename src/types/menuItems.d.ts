import { AccessTo } from '@/lib/redux/authorizedSlice';

export type MenuItem = {
  icon: React.ReactNode;
  label: string;
  link: string;
  accessto: AccessTo;
  children?: {
    label: string;
    link: string;
    accessto?: AccessTo;
    acessLevel?: AccessLevel;
    isAccessable?: boolean;
  }[];
};
