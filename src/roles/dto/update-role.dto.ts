// =============================================
// DTO para actualizar un Rol
// Todos los campos son opcionales (partial update)
// =============================================

import { IsOptional, IsString, IsBoolean, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateRoleDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre del rol no puede tener mas de 30 caracteres' })
    @Matches(/^[A-Z_]+$/, { message: 'El nombre del rol debe estar en mayusculas (usar _ para separar)' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser texto' })
    @MaxLength(150, { message: 'La descripcion no puede tener mas de 150 caracteres' })
    description?: string;

    @IsOptional()
    @IsBoolean({ message: 'El campo isActive debe ser true o false' })
    isActive?: boolean;
}
