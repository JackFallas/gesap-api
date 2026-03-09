// =============================================
// DTO para crear un Rol
// Validaciones campo por campo
// =============================================

import { IsNotEmpty, IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(3, { message: 'El nombre del rol debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre del rol no puede tener mas de 30 caracteres' })
    @Matches(/^[A-Z_]+$/, { message: 'El nombre del rol debe estar en mayusculas y sin espacios (usar _ para separar)' })
    name: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser texto' })
    @MaxLength(150, { message: 'La descripcion no puede tener mas de 150 caracteres' })
    description?: string;
}
