// =============================================
// UsersController
// CRUD + toggle-active + cambiar contrasena
// Solo AUDITOR puede gestionar usuarios
// =============================================

import {
    Controller, Get, Post, Put, Patch, Delete,
    Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, ChangePasswordDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    // POST /gesap/v1/users
    @Post()
    @Roles('AUDITOR')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // GET /gesap/v1/users
    @Get()
    @Roles('AUDITOR')
    findAll() {
        return this.usersService.findAll();
    }

    // GET /gesap/v1/users/:id
    @Get(':id')
    @Roles('AUDITOR')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    // PUT /gesap/v1/users/:id
    @Put(':id')
    @Roles('AUDITOR')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    // PATCH /gesap/v1/users/:id/toggle-active
    @Patch(':id/toggle-active')
    @Roles('AUDITOR')
    toggleActive(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.toggleActive(id);
    }

    // PATCH /gesap/v1/users/:id/change-password
    @Patch(':id/change-password')
    @Roles('AUDITOR')
    changePassword(
        @Param('id', ParseIntPipe) id: number,
        @Body() changePasswordDto: ChangePasswordDto,
    ) {
        return this.usersService.changePassword(id, changePasswordDto);
    }
}
