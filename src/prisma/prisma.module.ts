// =============================================
// PrismaModule
// Marcado como @Global para que PrismaService
// este disponible en TODOS los modulos sin importarlo
// =============================================

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }
