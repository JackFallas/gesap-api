// =============================================
// DTO para crear un Contacto de Emergencia
// Cada paciente puede tener maximo 5 contactos
// =============================================

import {
  IsNotEmpty, IsString, IsOptional, IsInt,
  MaxLength, Length, Matches, Min,
} from 'class-validator';

export class CreateEmergencyContactDto {
  @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
  @IsInt({ message: 'El ID del paciente debe ser un numero entero' })
  @Min(1, { message: 'El ID del paciente debe ser mayor a 0' })
  patientId: number;

  @IsNotEmpty({ message: 'El nombre completo del contacto es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  fullName: string;

  @IsNotEmpty({ message: 'El telefono del contacto es obligatorio' })
  @IsString({ message: 'El telefono debe ser texto' })
  @Length(8, 8, { message: 'El telefono debe tener exactamente 8 digitos' })
  @Matches(/^\d{8}$/, { message: 'El telefono solo puede contener numeros (8 digitos)' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'La relacion debe ser texto' })
  @MaxLength(50, { message: 'La relacion no puede exceder 50 caracteres' })
  relationship?: string;
}

export class UpdateEmergencyContactDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'El telefono debe tener 8 digitos' })
  @Matches(/^\d{8}$/, { message: 'Solo numeros' })
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  relationship?: string;
}
