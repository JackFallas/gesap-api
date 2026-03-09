// =============================================
// DTO para crear un Paciente
// Validaciones campo por campo segun reglas de Guatemala
// DPI = 13 digitos, telefono = 8 digitos
// =============================================

import {
    IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString,
    MinLength, MaxLength, Matches, Length,
} from 'class-validator';

// Enums que coinciden con los del schema de Prisma
export enum SexEnum {
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO',
}

export enum BloodTypeEnum {
    A_POSITIVO = 'A_POSITIVO',
    A_NEGATIVO = 'A_NEGATIVO',
    B_POSITIVO = 'B_POSITIVO',
    B_NEGATIVO = 'B_NEGATIVO',
    AB_POSITIVO = 'AB_POSITIVO',
    AB_NEGATIVO = 'AB_NEGATIVO',
    O_POSITIVO = 'O_POSITIVO',
    O_NEGATIVO = 'O_NEGATIVO',
}

export class CreatePatientDto {
    @IsNotEmpty({ message: 'El DPI es obligatorio' })
    @IsString({ message: 'El DPI debe ser texto' })
    @Length(13, 13, { message: 'El DPI debe tener exactamente 13 digitos' })
    @Matches(/^\d{13}$/, { message: 'El DPI solo puede contener numeros (13 digitos)' })
    dpi: string;

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

    @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
    @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
    birthDate: string;

    @IsNotEmpty({ message: 'El sexo es obligatorio' })
    @IsEnum(SexEnum, { message: 'El sexo debe ser MASCULINO o FEMENINO' })
    sex: SexEnum;

    @IsOptional()
    @IsEnum(BloodTypeEnum, {
        message: 'El tipo de sangre debe ser: A_POSITIVO, A_NEGATIVO, B_POSITIVO, B_NEGATIVO, AB_POSITIVO, AB_NEGATIVO, O_POSITIVO, O_NEGATIVO',
    })
    bloodType?: BloodTypeEnum;

    @IsOptional()
    @IsString({ message: 'El telefono debe ser texto' })
    @Length(8, 8, { message: 'El telefono debe tener exactamente 8 digitos' })
    @Matches(/^\d{8}$/, { message: 'El telefono solo puede contener numeros (8 digitos)' })
    phone?: string;

    @IsOptional()
    @IsString({ message: 'La direccion debe ser texto' })
    @MaxLength(255, { message: 'La direccion no puede exceder 255 caracteres' })
    address?: string;

    @IsOptional()
    @IsString({ message: 'El contacto de emergencia debe ser texto' })
    @MaxLength(100, { message: 'El contacto de emergencia no puede exceder 100 caracteres' })
    emergencyContact?: string;

    @IsOptional()
    @IsString({ message: 'El telefono de emergencia debe ser texto' })
    @Length(8, 8, { message: 'El telefono de emergencia debe tener 8 digitos' })
    @Matches(/^\d{8}$/, { message: 'El telefono de emergencia solo puede contener numeros' })
    emergencyPhone?: string;
}
