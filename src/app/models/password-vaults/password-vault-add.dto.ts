import { IPasswordVaultDto } from './password-vault-base.interface';

export interface PasswordVaultAddDto extends IPasswordVaultDto {
  userId: string;
  passwordRepeat: string;
  passwordExpirationDate?: string;
  categoryId: string;
} 