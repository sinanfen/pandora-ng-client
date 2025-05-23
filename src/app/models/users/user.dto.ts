import { PasswordVaultDto } from '../password-vaults/password-vault.dto';
import { PersonalVaultDto } from '../personal-vaults/personal-vault.dto';
import { CategoryDto } from '../categories/category.dto';
import { UserRoleDto } from './user-role.dto';
import { BaseDto } from '../base/base-dto';

export interface UserDto extends BaseDto<string> {
  id: string;
  username: string;
  normalizedUsername: string;
  email: string;
  normalizedEmail: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  twoFactorEnabled: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  lastLoginDate: string;
  lastPasswordChangeDate?: string;
  passwordVaults: PasswordVaultDto[];
  personalVaults: PersonalVaultDto[];
  categoryDtos: CategoryDto[];
  userRoleDtos: UserRoleDto[];
  isLockedOut: boolean;
  totalVaults: number;
  totalPersonalVaults: number;
  fullName: string;
}
