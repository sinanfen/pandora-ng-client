import { BaseDto } from '../base/base-dto';

export interface PasswordVaultDto extends BaseDto<string> {
  userId: string;
  secureSiteName: string;
  secureUsernameOrEmail: string;
  secureNotes: string;
  password: string;
  lastPasswordChangeDate?: string;
  passwordExpirationDate?: string;
  categoryId?: string;
} 