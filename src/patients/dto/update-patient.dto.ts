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
  @IsString({ message: 'El primer nombre debe ser texto' })
  @MinLength(2, { message: 'Minimo 2 caracteres' })
  @MaxLength(50, { message: 'Maximo 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'Solo letras' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'Solo letras' })
  secondName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'Solo letras' })
  thirdName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'Solo letras' })
  firstLastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'Solo letras' })
  secondLastName?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Formato: YYYY-MM-DD' })
  birthDate?: string;

  @IsOptional()
  @IsEnum(SexEnum, { message: 'Debe ser MASCULINO o FEMENINO' })
  sex?: SexEnum;

  @IsOptional()
  @IsEnum(BloodTypeEnum, { message: 'Tipo de sangre invalido' })
  bloodType?: BloodTypeEnum;

  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'El telefono debe tener 8 digitos' })
  @Matches(/^\d{8}$/)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;
}
