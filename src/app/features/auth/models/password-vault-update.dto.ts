import { BaseDto } from './base-dto';
import { IPasswordVaultDto } from './password-vault-base.interface';

export interface PasswordVaultUpdateDto extends BaseDto<string>, IPasswordVaultDto {
  userId: string;
  passwordExpirationDate?: string;
  lastPasswordChangeDate?: string;
  password: string;
  newPassword: string;
  newPasswordRepeat: string;
  categoryId?: string;
} 