// =============================================
// DTO para crear un Paciente
// Nombre completo: hasta 3 nombres + 2 apellidos
// DPI = 13 digitos, telefono = 8 digitos (Guatemala)
// =============================================

import {
  IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString,
  MinLength, MaxLength, Matches, Length,
} from 'class-validator';

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

  @IsNotEmpty({ message: 'El primer nombre es obligatorio' })
  @IsString({ message: 'El primer nombre debe ser texto' })
  @MinLength(2, { message: 'El primer nombre debe tener minimo 2 caracteres' })
  @MaxLength(50, { message: 'El primer nombre no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El primer nombre solo puede contener letras' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'El segundo nombre debe ser texto' })
  @MinLength(2, { message: 'El segundo nombre debe tener minimo 2 caracteres' })
  @MaxLength(50, { message: 'El segundo nombre no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El segundo nombre solo puede contener letras' })
  secondName?: string;

  @IsOptional()
  @IsString({ message: 'El tercer nombre debe ser texto' })
  @MinLength(2, { message: 'El tercer nombre debe tener minimo 2 caracteres' })
  @MaxLength(50, { message: 'El tercer nombre no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El tercer nombre solo puede contener letras' })
  thirdName?: string;

  @IsNotEmpty({ message: 'El primer apellido es obligatorio' })
  @IsString({ message: 'El primer apellido debe ser texto' })
  @MinLength(2, { message: 'El primer apellido debe tener minimo 2 caracteres' })
  @MaxLength(50, { message: 'El primer apellido no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El primer apellido solo puede contener letras' })
  firstLastName: string;

  @IsNotEmpty({ message: 'El segundo apellido es obligatorio' })
  @IsString({ message: 'El segundo apellido debe ser texto' })
  @MinLength(2, { message: 'El segundo apellido debe tener minimo 2 caracteres' })
  @MaxLength(50, { message: 'El segundo apellido no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, { message: 'El segundo apellido solo puede contener letras' })
  secondLastName: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  birthDate: string;

  @IsNotEmpty({ message: 'El sexo es obligatorio' })
  @IsEnum(SexEnum, { message: 'El sexo debe ser MASCULINO o FEMENINO' })
  sex: SexEnum;

  @IsOptional()
  @IsEnum(BloodTypeEnum, {
    message: 'Tipo de sangre: A_POSITIVO, A_NEGATIVO, B_POSITIVO, B_NEGATIVO, AB_POSITIVO, AB_NEGATIVO, O_POSITIVO, O_NEGATIVO',
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
}
