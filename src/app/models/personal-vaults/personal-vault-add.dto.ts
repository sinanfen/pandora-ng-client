import { IPersonalVaultDto } from './personal-vault-base.interface';

export interface PersonalVaultAddDto extends IPersonalVaultDto {
  userId: string;
  isLocked: boolean;
  unlockDate?: string;
  categoryId?: string;
  expirationDate?: string;
  isFavorite: boolean;
} 