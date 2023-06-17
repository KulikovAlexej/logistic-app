import { UserRoles } from '../../users/consts/user-roles.enum';
import { SetMetadata } from '@nestjs/common';

export const HasRoles = (roles: UserRoles[]) => SetMetadata('roles', roles);
