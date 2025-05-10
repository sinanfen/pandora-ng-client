import { BaseDto } from './base-dto';

export interface UserPasswordChangeDto extends BaseDto<string> {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  lastPasswordChangeDate?: string; // ISO string, optional
}
