import { BaseDto } from './base-dto';

export interface PersonalVaultDto extends BaseDto<string> {
  userId: string;
  username: string;
  secureTitle: string;
  secureContent: string;
  secureSummary: string;
  secureUrl: string;
  secureMediaFile: string;
  isLocked: boolean;
  unlockDate?: string;
  createdDate: string;
  lastModifiedDate?: string;
  expirationDate?: string;
  secureTags: string[];
  isFavorite: boolean;
  categoryId?: string;
  categoryName: string;
} 