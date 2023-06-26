import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
       
        if (!requiredRoles) {
            return true;
          }
          
          const user = context.switchToHttp().getRequest();
          const userRole = await this.prisma.role.findUnique({
            where: {
              id: user.user['roleID']
            }
          });
        
          return requiredRoles.includes(userRole?.name);
    }
}
