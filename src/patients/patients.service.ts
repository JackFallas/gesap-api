// =============================================
// PatientsService
// CRUD de pacientes + alergias + expedientes + tratamientos
// + contactos de emergencia (max 5 por paciente)
// =============================================

import {
  Injectable, NotFoundException, ConflictException, BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { CreateEmergencyContactDto, UpdateEmergencyContactDto } from './dto/create-emergency-contact.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  // ===========================================
  // CRUD DE PACIENTES
  // ===========================================

  async create(createPatientDto: CreatePatientDto) {
    const exists = await this.prisma.patient.findUnique({
      where: { dpi: createPatientDto.dpi },
    });

    if (exists) {
      throw new ConflictException('Ya existe un paciente con ese DPI');
    }

    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        birthDate: new Date(createPatientDto.birthDate),
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        allergies: { where: { isActive: true } },
        emergencyContacts: { where: { isActive: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        allergies: { where: { isActive: true } },
        emergencyContacts: { where: { isActive: true } },
        medicalRecords: {
          include: { doctor: { select: { firstName: true, lastName: true } } },
          orderBy: { createdAt: 'desc' },
        },
        treatments: {
          where: { isActive: true },
          include: { doctor: { select: { firstName: true, lastName: true } } },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`No se encontro el paciente con ID ${id}`);
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id);

    const data: any = { ...updatePatientDto };
    if (data.birthDate) {
      data.birthDate = new Date(data.birthDate);
    }

    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.patient.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // ===========================================
  // BUSQUEDA POR DPI (ENDPOINT DE EMERGENCIA)
  // ===========================================

  async findByDpi(dpi: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { dpi },
      include: {
        allergies: { where: { isActive: true } },
        treatments: { where: { isActive: true } },
        emergencyContacts: { where: { isActive: true } },
      },
    });

    if (!patient) {
      throw new NotFoundException(`No se encontro paciente con DPI ${dpi}`);
    }

    // Agrupar alergias por tipo para emergencias
    const allergiesByType = {
      MEDICATION: patient.allergies.filter(a => a.type === 'MEDICATION'),
      FOOD: patient.allergies.filter(a => a.type === 'FOOD'),
      ENVIRONMENTAL: patient.allergies.filter(a => a.type === 'ENVIRONMENTAL'),
      OTHER: patient.allergies.filter(a => a.type === 'OTHER'),
    };

    return {
      ...patient,
      allergiesByType,
    };
  }

  // ===========================================
  // CONTACTOS DE EMERGENCIA (max 5 por paciente)
  // ===========================================

  async createEmergencyContact(dto: CreateEmergencyContactDto) {
    await this.findOne(dto.patientId);

    // Verificar que no tenga mas de 5 contactos activos
    const count = await this.prisma.emergencyContact.count({
      where: { patientId: dto.patientId, isActive: true },
    });

    if (count >= 5) {
      throw new BadRequestException('El paciente ya tiene 5 contactos de emergencia (maximo permitido)');
    }

    return this.prisma.emergencyContact.create({ data: dto });
  }

  async findEmergencyContacts(patientId: number) {
    await this.findOne(patientId);

    return this.prisma.emergencyContact.findMany({
      where: { patientId, isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async updateEmergencyContact(id: number, dto: UpdateEmergencyContactDto) {
    const contact = await this.prisma.emergencyContact.findUnique({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`No se encontro el contacto de emergencia con ID ${id}`);
    }

    return this.prisma.emergencyContact.update({
      where: { id },
      data: dto,
    });
  }

  async removeEmergencyContact(id: number) {
    const contact = await this.prisma.emergencyContact.findUnique({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`No se encontro el contacto de emergencia con ID ${id}`);
    }

    return this.prisma.emergencyContact.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // ===========================================
  // ALERGIAS
  // ===========================================

  async createAllergy(createAllergyDto: CreateAllergyDto) {
    await this.findOne(createAllergyDto.patientId);
    return this.prisma.allergy.create({ data: createAllergyDto });
  }

  async findAllergies(patientId: number) {
    await this.findOne(patientId);
    return this.prisma.allergy.findMany({
      where: { patientId, isActive: true },
      orderBy: { severity: 'desc' },
    });
  }

  async removeAllergy(id: number) {
    const allergy = await this.prisma.allergy.findUnique({ where: { id } });
    if (!allergy) throw new NotFoundException(`Alergia con ID ${id} no encontrada`);
    return this.prisma.allergy.update({ where: { id }, data: { isActive: false } });
  }

  // ===========================================
  // EXPEDIENTES MEDICOS
  // ===========================================

  async createMedicalRecord(doctorId: number, dto: CreateMedicalRecordDto) {
    await this.findOne(dto.patientId);
    return this.prisma.medicalRecord.create({ data: { ...dto, doctorId } });
  }

  async findMedicalRecords(patientId: number) {
    await this.findOne(patientId);
    return this.prisma.medicalRecord.findMany({
      where: { patientId },
      include: { doctor: { select: { firstName: true, lastName: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ===========================================
  // TRATAMIENTOS
  // ===========================================

  async createTreatment(doctorId: number, dto: CreateTreatmentDto) {
    await this.findOne(dto.patientId);
    return this.prisma.treatment.create({
      data: {
        ...dto,
        doctorId,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  async findTreatments(patientId: number) {
    await this.findOne(patientId);
    return this.prisma.treatment.findMany({
      where: { patientId, isActive: true },
      include: { doctor: { select: { firstName: true, lastName: true } } },
      orderBy: { startDate: 'desc' },
    });
  }

  async deactivateTreatment(id: number) {
    const treatment = await this.prisma.treatment.findUnique({ where: { id } });
    if (!treatment) throw new NotFoundException(`Tratamiento con ID ${id} no encontrado`);
    return this.prisma.treatment.update({ where: { id }, data: { isActive: false } });
  }
}
