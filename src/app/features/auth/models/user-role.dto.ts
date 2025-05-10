import { RoleDto } from './role.dto';
import { UserDto } from './user.dto';

export interface UserRoleDto {
  UserId: string;
  UserDto: UserDto;
  RoleId: string;
  RoleDto: RoleDto;
}
