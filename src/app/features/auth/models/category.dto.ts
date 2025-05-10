import { BaseDto } from './base-dto';
import { UserDto } from './user.dto';
import { PasswordVaultDto } from './password-vault.dto';
import { PersonalVaultDto } from './personal-vault.dto';

export interface CategoryDto extends BaseDto<string> {
  userId: string;
  userDto: UserDto;
  name: string;
  description: string;
  passwordVaults: PasswordVaultDto[];
  personalVaultDtos: PersonalVaultDto[];
  totalVaults: number;
  totalPersonalVaults: number;
} 