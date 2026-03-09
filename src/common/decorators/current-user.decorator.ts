// =============================================
// Decorador @CurrentUser()
// Extrae el usuario autenticado del request
// Ejemplo: @CurrentUser() user => user.id, user.email, etc.
// =============================================

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        // Si se pasa un campo especifico, retornar solo ese campo
        // Ejemplo: @CurrentUser('id') retorna solo el id
        return data ? user?.[data] : user;
    },
);