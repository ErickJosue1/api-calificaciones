import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client' 

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>('roles',
            context.getHandler(),
        );

        console.log(requiredRoles)

        if (!requiredRoles.length) {
            // No role requirement specified, access granted
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
    
        if (!user || !requiredRoles.includes(user.role)) {
            // User role does not match the required roles
            return false;
        }

        // User has the required role, access granted
        return true;
    }
}
