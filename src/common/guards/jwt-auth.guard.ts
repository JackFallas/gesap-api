// =============================================
// JwtAuthGuard
// Protege las rutas que requieren autenticacion
// Verifica que el token JWT sea valido
// Uso: @UseGuards(JwtAuthGuard) en el controller
// =============================================

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw new UnauthorizedException('Token invalido o no proporcionado');
        }
        return user;
    }
}