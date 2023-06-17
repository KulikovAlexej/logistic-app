import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtTokenContentModel } from '../models/jwt-token-content.model';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../users/consts/user-roles.enum';

@Injectable()
export class JwtRolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const userDataFromJwtToken: JwtTokenContentModel = req.user;
    const userRolesFromJwt: UserRoles[] = userDataFromJwtToken.roles;

    const requiredToAccessRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    const currenUserHasSomeOfRequiredRoles = requiredToAccessRoles.some(
      (role) => userRolesFromJwt.includes(role),
    );

    if (!currenUserHasSomeOfRequiredRoles) {
      throw new ForbiddenException('не хватает прав для доступа к ресурсу!');
    }

    return super.canActivate(context);
  }
}
