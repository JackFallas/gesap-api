// =============================================
// RolesController
// Endpoints para gestionar roles del sistema
// Todos requieren autenticacion y rol AUDITOR
// =============================================

import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('AUDITOR')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    // POST /gesap/v1/roles
    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    // GET /gesap/v1/roles
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    // GET /gesap/v1/roles/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.findOne(id);
    }

    // PUT /gesap/v1/roles/:id
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    // DELETE /gesap/v1/roles/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.remove(id);
    }
}
