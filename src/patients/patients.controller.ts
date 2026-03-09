// =============================================
// PatientsController
// Endpoints para pacientes, alergias, expedientes y tratamientos
// =============================================

import {
    Controller, Get, Post, Put, Patch, Delete,
    Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
    constructor(private patientsService: PatientsService) { }

    // ===========================================
    // CRUD PACIENTES
    // ===========================================

    // POST /gesap/v1/patients
    @Post()
    @Roles('AUDITOR', 'DOCTOR')
    create(@Body() dto: CreatePatientDto) {
        return this.patientsService.create(dto);
    }

    // GET /gesap/v1/patients
    @Get()
    @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
    findAll() {
        return this.patientsService.findAll();
    }

    // GET /gesap/v1/patients/:id
    @Get(':id')
    @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.findOne(id);
    }

    // PUT /gesap/v1/patients/:id
    @Put(':id')
    @Roles('AUDITOR', 'DOCTOR')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
        return this.patientsService.update(id, dto);
    }

    // DELETE /gesap/v1/patients/:id (soft delete)
    @Delete(':id')
    @Roles('AUDITOR')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.remove(id);
    }

    // ===========================================
    // BUSQUEDA POR DPI (EMERGENCIA)
    // Accesible por todos los roles con token
    // ===========================================

    // GET /gesap/v1/patients/dpi/:dpi
    @Get('dpi/:dpi')
    @Roles('AUDITOR', 'DOCTOR', 'PARAMEDICO', 'BOMBERO', 'ENFERMERO')
    findByDpi(@Param('dpi') dpi: string) {
        return this.patientsService.findByDpi(dpi);
    }

    // ===========================================
    // ALERGIAS
    // ===========================================

    // POST /gesap/v1/patients/allergies
    @Post('allergies')
    @Roles('AUDITOR', 'DOCTOR')
    createAllergy(@Body() dto: CreateAllergyDto) {
        return this.patientsService.createAllergy(dto);
    }

    // GET /gesap/v1/patients/:id/allergies
    @Get(':id/allergies')
    @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO', 'PARAMEDICO')
    findAllergies(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.findAllergies(id);
    }

    // DELETE /gesap/v1/patients/allergies/:id
    @Delete('allergies/:id')
    @Roles('AUDITOR', 'DOCTOR')
    removeAllergy(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.removeAllergy(id);
    }

    // ===========================================
    // EXPEDIENTES MEDICOS
    // ===========================================

    // POST /gesap/v1/patients/medical-records
    @Post('medical-records')
    @Roles('DOCTOR')
    createMedicalRecord(
        @CurrentUser('id') doctorId: number,
        @Body() dto: CreateMedicalRecordDto,
    ) {
        return this.patientsService.createMedicalRecord(doctorId, dto);
    }

    // GET /gesap/v1/patients/:id/medical-records
    @Get(':id/medical-records')
    @Roles('AUDITOR', 'DOCTOR')
    findMedicalRecords(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.findMedicalRecords(id);
    }

    // ===========================================
    // TRATAMIENTOS
    // ===========================================

    // POST /gesap/v1/patients/treatments
    @Post('treatments')
    @Roles('DOCTOR')
    createTreatment(
        @CurrentUser('id') doctorId: number,
        @Body() dto: CreateTreatmentDto,
    ) {
        return this.patientsService.createTreatment(doctorId, dto);
    }

    // GET /gesap/v1/patients/:id/treatments
    @Get(':id/treatments')
    @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
    findTreatments(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.findTreatments(id);
    }

    // PATCH /gesap/v1/patients/treatments/:id/deactivate
    @Patch('treatments/:id/deactivate')
    @Roles('AUDITOR', 'DOCTOR')
    deactivateTreatment(@Param('id', ParseIntPipe) id: number) {
        return this.patientsService.deactivateTreatment(id);
    }
}
