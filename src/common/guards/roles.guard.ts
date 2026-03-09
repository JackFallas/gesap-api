// =============================================
// RolesGuard
// Verifica que el usuario tenga el rol necesario
// Funciona junto con el decorador @Roles()
// Uso: @UseGuards(JwtAuthGuard, RolesGuard)
//      @Roles('AUDITOR', 'DOCTOR')
// =============================================

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Obtener los roles permitidos del decorador @Roles()
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Si no hay roles requeridos, dejar pasar
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        // Obtener el usuario del request (viene del JwtAuthGuard)
        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.roleName) {
            throw new ForbiddenException('No se pudo verificar el rol del usuario');
        }

        // Verificar si el rol del usuario esta en la lista de roles permitidos
        const hasRole = requiredRoles.includes(user.roleName);

        if (!hasRole) {
            throw new ForbiddenException(
                `Acceso denegado. Se requiere uno de estos roles: ${requiredRoles.join(', ')}`,
            );
        }

        return true;
    }
}
