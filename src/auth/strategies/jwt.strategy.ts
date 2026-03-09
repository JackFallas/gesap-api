// =============================================
// JwtStrategy
// Estrategia de Passport que valida el token JWT
// Extrae el token del header Authorization: Bearer <token>
// =============================================

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            // Extraer el token del header Authorization
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    // Este metodo se ejecuta cuando el token es valido
    // El payload contiene los datos que se guardaron al crear el token
    async validate(payload: { sub: number; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: { role: true },
        });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Usuario no encontrado o desactivado');
        }

        // Esto se guarda en request.user
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roleId: user.roleId,
            roleName: user.role.name,
        };
    }
}
