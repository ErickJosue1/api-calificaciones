import { Controller, Get, Req, UseGuards, Put, Body, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/auth/dto';
import { Roles } from 'src/auth/decorator/roles.decorator';


@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('all')
    @Roles('TEACHER', 'ADMIN')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Roles('TEACHER', 'ADMIN')
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        let num = +id;
        return this.userService.updateUser(num, updateUserDto);
    }

    @Get('me')
    getMe(@GetUser() user: User, @GetUser('id') id: string) {
        console.log(id)
        return user;
    }

    @Delete(':id')
    @Roles('TEACHER', 'ADMIN')
    deleteUser(@Param('id') id: number): Promise<void> {
        let num = +id;
        return this.userService.deleteUser(num);
    }
}
