// =============================================
// UsersService
// CRUD de usuarios + toggle active + cambiar contrasena
// =============================================

import {
    Injectable, NotFoundException, ConflictException, BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, ChangePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    // Crear usuario nuevo
    async create(createUserDto: CreateUserDto) {
        // Verificar que el email no este registrado
        const exists = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });

        if (exists) {
            throw new ConflictException('Ya existe un usuario con ese correo');
        }

        // Verificar que el rol exista
        const role = await this.prisma.role.findUnique({
            where: { id: createUserDto.roleId },
        });

        if (!role) {
            throw new NotFoundException(`No existe el rol con ID ${createUserDto.roleId}`);
        }

        // Encriptar la contrasena con bcrypt (10 rondas de salt)
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
            include: { role: true },
        });

        // No retornar la contrasena
        const { password, ...result } = user;
        return result;
    }

    // Listar todos los usuarios
    async findAll() {
        const users = await this.prisma.user.findMany({
            include: { role: { select: { id: true, name: true } } },
            orderBy: { id: 'asc' },
        });

        // Quitar contrasena de cada usuario
        return users.map(({ password, ...user }) => user);
    }

    // Buscar usuario por ID
    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });

        if (!user) {
            throw new NotFoundException(`No se encontro el usuario con ID ${id}`);
        }

        const { password, ...result } = user;
        return result;
    }

    // Actualizar datos del usuario
    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.findOne(id);

        // Si cambian el email, verificar que no este en uso
        if (updateUserDto.email) {
            const emailInUse = await this.prisma.user.findFirst({
                where: { email: updateUserDto.email, NOT: { id } },
            });

            if (emailInUse) {
                throw new ConflictException('Ese correo ya esta registrado por otro usuario');
            }
        }

        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            include: { role: true },
        });

        const { password, ...result } = user;
        return result;
    }

    // Activar o desactivar un usuario
    async toggleActive(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException(`No se encontro el usuario con ID ${id}`);
        }

        const updated = await this.prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive },
        });

        return {
            message: updated.isActive ? 'Usuario activado' : 'Usuario desactivado',
            isActive: updated.isActive,
        };
    }

    // Cambiar contrasena del usuario
    async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) {
            throw new NotFoundException(`No se encontro el usuario con ID ${id}`);
        }

        // Verificar contrasena actual
        const isValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password);

        if (!isValid) {
            throw new BadRequestException('La contrasena actual es incorrecta');
        }

        // Encriptar y guardar la nueva
        const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

        await this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });

        return { message: 'Contrasena actualizada correctamente' };
    }
}
