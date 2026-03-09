// =============================================
// RolesService
// Logica de negocio para el CRUD de roles
// =============================================

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    // Crear un nuevo rol
    async create(createRoleDto: CreateRoleDto) {
        // Verificar que no exista un rol con ese nombre
        const exists = await this.prisma.role.findUnique({
            where: { name: createRoleDto.name },
        });

        if (exists) {
            throw new ConflictException(`Ya existe un rol con el nombre ${createRoleDto.name}`);
        }

        return this.prisma.role.create({ data: createRoleDto });
    }

    // Listar todos los roles
    async findAll() {
        return this.prisma.role.findMany({
            orderBy: { id: 'asc' },
        });
    }

    // Buscar un rol por ID
    async findOne(id: number) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: { users: { select: { id: true, email: true, firstName: true, lastName: true } } },
        });

        if (!role) {
            throw new NotFoundException(`No se encontro el rol con ID ${id}`);
        }

        return role;
    }

    // Actualizar un rol
    async update(id: number, updateRoleDto: UpdateRoleDto) {
        await this.findOne(id); // Verifica que exista

        return this.prisma.role.update({
            where: { id },
            data: updateRoleDto,
        });
    }

    // Eliminar un rol (soft delete: solo desactiva)
    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.role.update({
            where: { id },
            data: { isActive: false },
        });
    }
}
