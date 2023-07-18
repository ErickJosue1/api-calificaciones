import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.prismaService.role.findMany();
  }

  @Get( ':id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return this.prismaService.role.findUnique({
      where: { id },
    });
  }

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    return this.prismaService.role.create({
      data: role,
    });
  }

  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() role: Role): Promise<Role> {
    return this.prismaService.role.update({
      where: { id },
      data: role,
    });
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<Role> {
    return this.prismaService.role.delete({
      where: { id },
    });
  }
}
