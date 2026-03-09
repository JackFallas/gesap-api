// =============================================
// DTO para crear un Expediente Medico
// El diagnostico es obligatorio, los demas opcionales
// vital_signs es un JSON con signos vitales
// =============================================

import { IsNotEmpty, IsString, IsOptional, IsInt, IsObject, Min } from 'class-validator';

export class CreateMedicalRecordDto {
    @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
    @IsInt({ message: 'El ID del paciente debe ser un numero entero' })
    @Min(1, { message: 'El ID del paciente debe ser mayor a 0' })
    patientId: number;

    @IsNotEmpty({ message: 'El diagnostico es obligatorio' })
    @IsString({ message: 'El diagnostico debe ser texto' })
    diagnosis: string;

    @IsOptional()
    @IsString({ message: 'Las notas deben ser texto' })
    notes?: string;

    @IsOptional()
    @IsObject({ message: 'Los signos vitales deben ser un objeto JSON (ej: {"weight": 70, "height": 170, "blood_pressure": "120/80", "temperature": 36.5, "heart_rate": 72})' })
    vitalSigns?: Record<string, any>;
}
