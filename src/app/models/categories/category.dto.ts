import { BaseDto } from '../base/base-dto';
import { UserDto } from '../users/user.dto';
import { PasswordVaultDto } from '../password-vaults/password-vault.dto';
import { PersonalVaultDto } from '../personal-vaults/personal-vault.dto';

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