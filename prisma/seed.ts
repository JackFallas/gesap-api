// =============================================
// Seed - Datos iniciales del sistema
// Crea roles, usuario auditor y 5 pacientes de prueba
// Ejecutar con: npx ts-node prisma/seed.ts
// =============================================

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed de datos...');

  // ---- ROLES ----
  const roles = [
    { name: 'AUDITOR', description: 'Acceso completo al sistema, gestion de usuarios y auditoria' },
    { name: 'DOCTOR', description: 'Consulta y modificacion de pacientes dentro de su horario' },
    { name: 'PARAMEDICO', description: 'Busqueda de pacientes en emergencias' },
    { name: 'BOMBERO', description: 'Consulta basica de pacientes' },
    { name: 'ENFERMERO', description: 'Consulta de signos vitales y alergias' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
    console.log(`Rol creado: ${role.name}`);
  }

  // ---- USUARIO AUDITOR ----
  const auditorRole = await prisma.role.findUnique({ where: { name: 'AUDITOR' } });
  const doctorRole = await prisma.role.findUnique({ where: { name: 'DOCTOR' } });

  if (auditorRole) {
    const hashedPassword = await bcrypt.hash('GESAP2024!', 10);

    await prisma.user.upsert({
      where: { email: 'auditor@gesap.gt' },
      update: {},
      create: {
        email: 'auditor@gesap.gt',
        password: hashedPassword,
        firstName: 'Administrador',
        lastName: 'GESAP',
        roleId: auditorRole.id,
        isActive: true,
      },
    });
    console.log('Usuario auditor creado: auditor@gesap.gt / GESAP2024!');
  }

  // ---- USUARIO DOCTOR (para pruebas de expedientes y tratamientos) ----
  if (doctorRole) {
    const hashedPassword = await bcrypt.hash('Doctor2024!', 10);

    await prisma.user.upsert({
      where: { email: 'dr.lopez@gesap.gt' },
      update: {},
      create: {
        email: 'dr.lopez@gesap.gt',
        password: hashedPassword,
        firstName: 'Carlos',
        lastName: 'Lopez',
        roleId: doctorRole.id,
        isActive: true,
      },
    });
    console.log('Usuario doctor creado: dr.lopez@gesap.gt / Doctor2024!');
  }

  // ---- 5 PACIENTES DE PRUEBA ----
  const patients = [
    {
      dpi: '2987654321001',
      firstName: 'Juan',
      secondName: 'Carlos',
      thirdName: null,
      firstLastName: 'Perez',
      secondLastName: 'Garcia',
      birthDate: new Date('1990-05-15'),
      sex: 'MASCULINO' as const,
      bloodType: 'O_POSITIVO' as const,
      phone: '55123456',
      address: 'Zona 1, Ciudad de Guatemala',
    },
    {
      dpi: '3012345678002',
      firstName: 'Maria',
      secondName: 'Fernanda',
      thirdName: null,
      firstLastName: 'Lopez',
      secondLastName: 'Martinez',
      birthDate: new Date('1985-11-20'),
      sex: 'FEMENINO' as const,
      bloodType: 'A_POSITIVO' as const,
      phone: '44112233',
      address: 'Zona 10, Ciudad de Guatemala',
    },
    {
      dpi: '2765432109003',
      firstName: 'Pedro',
      secondName: null,
      thirdName: null,
      firstLastName: 'Ramirez',
      secondLastName: 'Hernandez',
      birthDate: new Date('1978-03-08'),
      sex: 'MASCULINO' as const,
      bloodType: 'B_NEGATIVO' as const,
      phone: '55998877',
      address: 'Zona 5, Mixco',
    },
    {
      dpi: '3198765432004',
      firstName: 'Ana',
      secondName: 'Lucia',
      thirdName: 'Isabel',
      firstLastName: 'Morales',
      secondLastName: 'Castillo',
      birthDate: new Date('1995-07-22'),
      sex: 'FEMENINO' as const,
      bloodType: 'AB_POSITIVO' as const,
      phone: '33445566',
      address: 'Zona 15, Ciudad de Guatemala',
    },
    {
      dpi: '2654321098005',
      firstName: 'Diego',
      secondName: 'Alejandro',
      thirdName: null,
      firstLastName: 'Santos',
      secondLastName: 'Mejia',
      birthDate: new Date('2000-12-01'),
      sex: 'MASCULINO' as const,
      bloodType: 'O_NEGATIVO' as const,
      phone: '55667788',
      address: 'Zona 7, Ciudad de Guatemala',
    },
  ];

  for (const patient of patients) {
    await prisma.patient.upsert({
      where: { dpi: patient.dpi },
      update: {},
      create: patient,
    });
    console.log(`Paciente creado: ${patient.firstName} ${patient.firstLastName} (DPI: ${patient.dpi})`);
  }

  console.log('Seed completado exitosamente');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
