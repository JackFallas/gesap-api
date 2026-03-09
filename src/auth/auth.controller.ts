// =============================================
// AuthController
// Endpoints de autenticacion
// POST /gesap/v1/auth/login  - Iniciar sesion
// GET  /gesap/v1/auth/profile - Ver perfil (requiere token)
// =============================================

import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@CurrentUser('id') userId: number) {
        return this.authService.getProfile(userId);
    }
}
