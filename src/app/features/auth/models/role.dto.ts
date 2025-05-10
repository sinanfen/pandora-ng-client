import { BaseDto } from './base-dto';
import { UserRoleDto } from './user-role.dto';

export interface RoleDto extends BaseDto<string> {
  name: string;
  normalizedName: string;
  description: string;
  userRoleDtos: UserRoleDto[];
}
