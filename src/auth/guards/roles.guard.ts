import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { JwtPayload } from '../model/jwt-payload,model';
import { Role } from '../model/role.model';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    const user = request.user as JwtPayload;
    const isAuth = roles.some(role => role === user.role);

    if(isAuth) return true;
    throw new UnauthorizedException('bad permissions');

  }

}
