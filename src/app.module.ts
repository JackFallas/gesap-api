// =============================================
// Modulo principal de la aplicacion
// Importa todos los modulos del sistema
// =============================================

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';

@Module({
    imports: [
        // Conexion a la BD - es @Global, disponible en todos los modulos
        PrismaModule,
        // Login y perfil con JWT
        AuthModule,
        // CRUD de roles    
        RolesModule,
        // CRUD de usuarios del sistema  
        UsersModule,
        // CRUD de pacientes, alergias, expedientes, tratamientos
        PatientsModule,
    ],
})
export class AppModule { }
