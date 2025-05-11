import { BaseDto } from '../base/base-dto';

export interface CategoryUpdateDto extends BaseDto<string> {
  userId?: string;
  name: string;
  description: string;
} 