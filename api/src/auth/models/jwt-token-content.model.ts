import { UserRoles } from '../../users/consts/user-roles.enum';

export class JwtTokenContentModel {
  email: string;
  roles: UserRoles[];
}
