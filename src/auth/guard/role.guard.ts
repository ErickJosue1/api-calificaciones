import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // No roles are required, so access is granted
        }

        const { user } = context.switchToHttp().getRequest();
        const userRole = user.role;
        if (requiredRoles.includes(userRole)) {
            return true
        }
        else {
            return false
        }

    }
}
