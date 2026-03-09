// =============================================
// DTO para Login
// Valida los campos necesarios para iniciar sesion
// =============================================

import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    @IsEmail({}, { message: 'El correo debe tener formato valido (ejemplo@dominio.com)' })
    @MaxLength(100, { message: 'El correo no puede tener mas de 100 caracteres' })
    email: string;

    @IsNotEmpty({ message: 'La contrasena es obligatoria' })
    @IsString({ message: 'La contrasena debe ser texto' })
    password: string;
}
