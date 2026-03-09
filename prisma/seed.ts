// =============================================
// Seed - Datos iniciales del sistema
// Crea los roles y el usuario auditor por defecto
// Ejecutar con: npx ts-node prisma/seed.ts
// =============================================

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando seed de datos...');

    // Crear los 5 roles del sistema
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

    // Crear usuario auditor por defecto (util para desarrollo pero debe quitarse en version final)
    // datos de usr: [auditor@gesap.gt] / GESAP2024!
    // Borrar en la version final
    const auditorRole = await prisma.role.findUnique({ where: { name: 'AUDITOR' } });

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
