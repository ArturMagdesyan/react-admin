import { UserRole } from '../../../common/enums';

type InputType = 'phone' | 'number';

export interface DialogProps {
  open: boolean;
  id: number;
  inputType?: InputType;
  onClose: () => void;
}

export interface UserInvitation {
  phone: string;
  name: string;
  email: string;
  roleName: UserRole
}

export type UserManageType = 'vendorDiscount' | 'customerDiscount' | 'balance';

export type NewOrganization = Pick<DialogProps, 'open' | 'onClose'>;
