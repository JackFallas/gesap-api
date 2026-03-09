// =============================================
// PatientsController
// CRUD pacientes + alergias + expedientes + tratamientos
// + contactos de emergencia (max 5)
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
import { CreateEmergencyContactDto, UpdateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  // ===========================================
  // CRUD PACIENTES
  // ===========================================

  @Post()
  @Roles('AUDITOR', 'DOCTOR')
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Get()
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  @Roles('AUDITOR', 'DOCTOR')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('AUDITOR')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }

  // ===========================================
  // BUSQUEDA POR DPI (EMERGENCIA)
  // ===========================================

  @Get('dpi/:dpi')
  @Roles('AUDITOR', 'DOCTOR', 'PARAMEDICO', 'BOMBERO', 'ENFERMERO')
  findByDpi(@Param('dpi') dpi: string) {
    return this.patientsService.findByDpi(dpi);
  }

  // ===========================================
  // CONTACTOS DE EMERGENCIA (max 5)
  // ===========================================

  // POST /gesap/v1/patients/emergency-contacts
  @Post('emergency-contacts')
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
  createEmergencyContact(@Body() dto: CreateEmergencyContactDto) {
    return this.patientsService.createEmergencyContact(dto);
  }

  // GET /gesap/v1/patients/:id/emergency-contacts
  @Get(':id/emergency-contacts')
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO', 'PARAMEDICO', 'BOMBERO')
  findEmergencyContacts(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findEmergencyContacts(id);
  }

  // PUT /gesap/v1/patients/emergency-contacts/:id
  @Put('emergency-contacts/:id')
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
  updateEmergencyContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmergencyContactDto,
  ) {
    return this.patientsService.updateEmergencyContact(id, dto);
  }

  // DELETE /gesap/v1/patients/emergency-contacts/:id
  @Delete('emergency-contacts/:id')
  @Roles('AUDITOR', 'DOCTOR')
  removeEmergencyContact(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.removeEmergencyContact(id);
  }

  // ===========================================
  // ALERGIAS
  // ===========================================

  @Post('allergies')
  @Roles('AUDITOR', 'DOCTOR')
  createAllergy(@Body() dto: CreateAllergyDto) {
    return this.patientsService.createAllergy(dto);
  }

  @Get(':id/allergies')
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO', 'PARAMEDICO')
  findAllergies(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findAllergies(id);
  }

  @Delete('allergies/:id')
  @Roles('AUDITOR', 'DOCTOR')
  removeAllergy(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.removeAllergy(id);
  }

  // ===========================================
  // EXPEDIENTES MEDICOS
  // ===========================================

  @Post('medical-records')
  @Roles('DOCTOR')
  createMedicalRecord(
    @CurrentUser('id') doctorId: number,
    @Body() dto: CreateMedicalRecordDto,
  ) {
    return this.patientsService.createMedicalRecord(doctorId, dto);
  }

  @Get(':id/medical-records')
  @Roles('AUDITOR', 'DOCTOR')
  findMedicalRecords(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findMedicalRecords(id);
  }

  // ===========================================
  // TRATAMIENTOS
  // ===========================================

  @Post('treatments')
  @Roles('DOCTOR')
  createTreatment(
    @CurrentUser('id') doctorId: number,
    @Body() dto: CreateTreatmentDto,
  ) {
    return this.patientsService.createTreatment(doctorId, dto);
  }

  @Get(':id/treatments')
  @Roles('AUDITOR', 'DOCTOR', 'ENFERMERO')
  findTreatments(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findTreatments(id);
  }

  @Patch('treatments/:id/deactivate')
  @Roles('AUDITOR', 'DOCTOR')
  deactivateTreatment(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.deactivateTreatment(id);
  }
}
