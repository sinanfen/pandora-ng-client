import { BaseDto } from '../base/base-dto';
import { IPersonalVaultDto } from './personal-vault-base.interface';

export interface PersonalVaultUpdateDto
  extends BaseDto<string>,
    IPersonalVaultDto {
  userId: string;
  isLocked: boolean;
  unlockDate?: string;
  categoryId?: string;
  expirationDate?: string;
  isFavorite: boolean;
  lastModifiedDate?: string;
}
