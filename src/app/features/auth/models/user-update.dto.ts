import { BaseDto } from './base-dto';

export interface UserUpdateDto extends BaseDto<string> {
  username?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  lastLoginDate?: string; // ISO string, optional
} 