// =============================================
// GESAP API - Punto de entrada
// Configura el servidor NestJS en el puerto 3000
// Prefijo global: /gesap/v1
// =============================================

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Prefijo global para todas las rutas: /gesap/v1/...
    app.setGlobalPrefix('gesap/v1');

    // Pipe global de validacion
    // Usa los decoradores de class-validator en los DTOs
    // whitelist: elimina campos que no esten definidos en el DTO
    // forbidNonWhitelisted: lanza error si mandan campos extra
    // transform: convierte los tipos automaticamente (string a number, etc.)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    // Habilitar CORS para el portal de pacientes
    app.enableCors({
        origin: ['http://localhost:3002'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    });

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`GESAP API ejecutandose en http://localhost:${port}/gesap/v1`);
}

bootstrap();
