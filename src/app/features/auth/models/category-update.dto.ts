import { BaseDto } from './base-dto';

export interface CategoryUpdateDto extends BaseDto<string> {
  userId?: string;
  name: string;
  description: string;
} 