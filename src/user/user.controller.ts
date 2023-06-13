import { Controller, Get, Req, UseGuards, Put, Body, Param, Delete} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UserRoles } from 'src/auth/decorator/roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/roles/roles';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/auth/dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UserRoles()
    @Get('all')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @UserRoles() // Specify the required role(s) for this route
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        let num = +id;
        return this.userService.updateUser(num, updateUserDto);
    }

    @UserRoles()
    @Get('me')
    getMe(@GetUser() user: User, @GetUser('id') id: string) {
        console.log(id)
        return user;
    }

    @UserRoles()
    @Delete(':id')
    @UserRoles(Role.ADMIN) // Specify the required role(s) for this route
    deleteUser(@Param('id') id: number): Promise<void> {
        let num = +id;
        return this.userService.deleteUser(num);
    }
}
