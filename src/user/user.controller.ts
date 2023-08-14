import { Controller, Get, Req, UseGuards, Put, Body, Param, Delete, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUserMe } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/auth/dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

interface RequestWithUser extends Request {
    user: User; 
  }

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService, private prisma: PrismaService) { }

    @Get('all')
    @Roles('ADMIN')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id/only')
    @Roles('ADMIN')
    getUser(@Param('id') id: string) {
        return this.userService.getUser(+id);
    }


    @Roles('ADMIN')
    @Put(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        let num = +id;
        return this.userService.updateUser(num, updateUserDto);
    }

    @Get('curp/:curp')
    renapoService(@Param('curp') curp: string) {
        return this.userService.renapoService(curp);
    }

    @Get('profile')
    async getUserProfile(@Req() request: RequestWithUser) {
      // The user information can be accessed from the request object
      const user = request.user;
  
      return user;
    }

    @Get('me')
    getMe(@GetUserMe() user: User, @GetUserMe('id') id: string) {


        const f_user = this.prisma.user.findUnique({
            where: {
                id: user.id,
            },
            include: { role: true }, // Include the role 
        })

        return f_user;
    }

    @Delete(':id')
    @Roles('ADMIN')
    deleteUser(@Param('id') id: number): Promise<void> {
        let num = +id;
        return this.userService.deleteUser(num);
    }
}
