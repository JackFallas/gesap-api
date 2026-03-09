// =============================================
// AuthService
// Logica de autenticacion: login y generacion de JWT
// =============================================

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    // Iniciar sesion: valida credenciales y retorna token JWT
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Buscar usuario por email incluyendo su rol
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Tu cuenta esta desactivada, contacta al administrador');
        }

        // Comparar la contrasena enviada con la almacenada (hash bcrypt)
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        // Crear el payload del token
        const payload = { sub: user.id, email: user.email };

        return {
            message: 'Login exitoso',
            token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role.name,
            },
        };
    }

    // Obtener perfil del usuario autenticado
    async getProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { role: true },
        });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        // No enviar la contrasena
        const { password, ...result } = user;
        return result;
    }
}
