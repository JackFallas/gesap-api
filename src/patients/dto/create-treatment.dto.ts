// =============================================
// DTO para crear un Tratamiento
// Nombre obligatorio, descripcion y fechas opcionales
// =============================================

import {
    IsNotEmpty, IsString, IsOptional, IsInt, IsDateString,
    MinLength, MaxLength, Min,
} from 'class-validator';

export class CreateTreatmentDto {
    @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
    @IsInt({ message: 'El ID del paciente debe ser un numero entero' })
    @Min(1, { message: 'El ID del paciente debe ser mayor a 0' })
    patientId: number;

    @IsNotEmpty({ message: 'El nombre del tratamiento es obligatorio' })
    @IsString({ message: 'El nombre del tratamiento debe ser texto' })
    @MinLength(3, { message: 'El nombre debe tener minimo 3 caracteres' })
    @MaxLength(150, { message: 'El nombre no puede exceder 150 caracteres' })
    name: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser texto' })
    description?: string;

    @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
    @IsDateString({}, { message: 'La fecha de inicio debe tener formato YYYY-MM-DD' })
    startDate: string;

    @IsOptional()
    @IsDateString({}, { message: 'La fecha de fin debe tener formato YYYY-MM-DD' })
    endDate?: string;
}
