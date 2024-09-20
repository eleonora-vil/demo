export type IUser = {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  gender: string;
  type: 'Super Admin' | 'Admin' | 'Trainer' | 'Instructor';
  phoneNumber?: string;
};

export type User = {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  gender: string;
  level: string;
  address: string;
  birthDate: string | null;
  otpCode: string | null;
  phoneNumber: string;
  fsu: string | null;
  createBy: string | null;
  createDate: string | null;
  modifyBy: string | null;
  modifyDate: string | null;
  avatar: string | null;
  status: string;
  roleID: number;
  roleName: string;
};
