// =============================================
// DTO para actualizar un Paciente
// Todos los campos son opcionales
// =============================================

import {
    IsOptional, IsString, IsEnum, IsDateString,
    MinLength, MaxLength, Matches, Length,
} from 'class-validator';
import { SexEnum, BloodTypeEnum } from './create-patient.dto';

export class UpdatePatientDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(2, { message: 'El nombre debe tener minimo 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El nombre solo puede contener letras' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'El apellido debe ser texto' })
    @MinLength(2, { message: 'El apellido debe tener minimo 2 caracteres' })
    @MaxLength(50, { message: 'El apellido no puede exceder 50 caracteres' })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El apellido solo puede contener letras' })
    lastName?: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
    birthDate?: string;

    @IsOptional()
    @IsEnum(SexEnum, { message: 'El sexo debe ser MASCULINO o FEMENINO' })
    sex?: SexEnum;

    @IsOptional()
    @IsEnum(BloodTypeEnum, { message: 'Tipo de sangre invalido' })
    bloodType?: BloodTypeEnum;

    @IsOptional()
    @IsString()
    @Length(8, 8, { message: 'El telefono debe tener 8 digitos' })
    @Matches(/^\d{8}$/, { message: 'El telefono solo puede contener numeros' })
    phone?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255, { message: 'La direccion no puede exceder 255 caracteres' })
    address?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, { message: 'El contacto de emergencia no puede exceder 100 caracteres' })
    emergencyContact?: string;

    @IsOptional()
    @IsString()
    @Length(8, 8, { message: 'El telefono de emergencia debe tener 8 digitos' })
    @Matches(/^\d{8}$/)
    emergencyPhone?: string;
}
