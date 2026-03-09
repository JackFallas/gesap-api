// =============================================
// PrismaService
// Maneja la conexion con PostgreSQL a traves de Prisma
// Se conecta al iniciar y desconecta al cerrar la app
// =============================================

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
        console.log('Prisma conectado a PostgreSQL');
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}