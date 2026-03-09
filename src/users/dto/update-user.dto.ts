// =============================================
// DTO para actualizar un Usuario
// Campos opcionales + DTO para cambiar contrasena
// =============================================

import {
    IsOptional, IsEmail, IsString, IsInt, IsBoolean,
    MinLength, MaxLength, Matches, Min,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail({}, { message: 'El correo debe tener formato valido' })
    @MaxLength(100, { message: 'El correo no puede exceder 100 caracteres' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(2, { message: 'El nombre debe tener minimo 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El nombre solo puede contener letras y espacios' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'El apellido debe ser texto' })
    @MinLength(2, { message: 'El apellido debe tener minimo 2 caracteres' })
    @MaxLength(50, { message: 'El apellido no puede exceder 50 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El apellido solo puede contener letras y espacios' })
    lastName?: string;

    @IsOptional()
    @IsInt({ message: 'El ID del rol debe ser un numero entero' })
    @Min(1, { message: 'El ID del rol debe ser mayor a 0' })
    roleId?: number;
}

// DTO separado para cambiar contrasena
export class ChangePasswordDto {
    @IsString({ message: 'La contrasena actual es obligatoria' })
    currentPassword: string;

    @IsString({ message: 'La nueva contrasena debe ser texto' })
    @MinLength(8, { message: 'La nueva contrasena debe tener minimo 8 caracteres' })
    @MaxLength(50, { message: 'La nueva contrasena no puede exceder 50 caracteres' })
    @Matches(/[A-Z]/, { message: 'La nueva contrasena debe tener al menos una mayuscula' })
    @Matches(/[a-z]/, { message: 'La nueva contrasena debe tener al menos una minuscula' })
    @Matches(/[0-9]/, { message: 'La nueva contrasena debe tener al menos un numero' })
    @Matches(/[!@#$%^&*]/, { message: 'La nueva contrasena debe tener un caracter especial (!@#$%^&*)' })
    newPassword: string;
}
