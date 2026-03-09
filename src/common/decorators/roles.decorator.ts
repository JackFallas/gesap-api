// =============================================
// Decorador @Roles()
// Marca que roles pueden acceder a un endpoint
// Ejemplo: @Roles('AUDITOR', 'DOCTOR')
// =============================================

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
