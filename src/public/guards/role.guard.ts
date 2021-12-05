import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthUserInterface } from '../interfaces/request-user.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    if (context.getType<string>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
      const user = req.user;
      return this.hasRole(user, requiredRoles);
    }
    const { user }: { user: AuthUserInterface } = context
      .switchToHttp()
      .getRequest();
    return this.hasRole(user, requiredRoles);
  }

  hasRole(user: AuthUserInterface, requiredRoles: Role[]): boolean {
    return requiredRoles.some((role) => user.role === role);
  }
}
