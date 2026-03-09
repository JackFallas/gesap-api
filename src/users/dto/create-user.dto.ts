// =============================================
// DTO para crear un Usuario
// Validaciones estrictas campo por campo
// =============================================

import {
    IsNotEmpty, IsEmail, IsString, IsInt,
    MinLength, MaxLength, Matches, Min,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @IsEmail({}, { message: 'El correo debe tener formato valido (ej: usuario@gesap.gt)' })
    @MaxLength(100, { message: 'El correo no puede exceder 100 caracteres' })
    email: string;

    @IsNotEmpty({ message: 'La contrasena es obligatoria' })
    @IsString({ message: 'La contrasena debe ser texto' })
    @MinLength(8, { message: 'La contrasena debe tener minimo 8 caracteres' })
    @MaxLength(50, { message: 'La contrasena no puede exceder 50 caracteres' })
    @Matches(/[A-Z]/, { message: 'La contrasena debe tener al menos una mayuscula' })
    @Matches(/[a-z]/, { message: 'La contrasena debe tener al menos una minuscula' })
    @Matches(/[0-9]/, { message: 'La contrasena debe tener al menos un numero' })
    @Matches(/[!@#$%^&*]/, { message: 'La contrasena debe tener al menos un caracter especial (!@#$%^&*)' })
    password: string;

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(2, { message: 'El nombre debe tener minimo 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El nombre solo puede contener letras y espacios' })
    firstName: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser texto' })
    @MinLength(2, { message: 'El apellido debe tener minimo 2 caracteres' })
    @MaxLength(50, { message: 'El apellido no puede exceder 50 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El apellido solo puede contener letras y espacios' })
    lastName: string;

    @IsNotEmpty({ message: 'El ID del rol es obligatorio' })
    @IsInt({ message: 'El ID del rol debe ser un numero entero' })
    @Min(1, { message: 'El ID del rol debe ser mayor a 0' })
    roleId: number;
}
