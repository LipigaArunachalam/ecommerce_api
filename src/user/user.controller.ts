import { Controller, Get, Body, Post, ValidationPipe, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, VerifyUserDto } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get("all-user")
    getAllUser() {
        return this.userService.getAll();
    }

    @Post("register")
    createUser(@Body(ValidationPipe) nuser: CreateUserDto) {
        return this.userService.create(nuser);
    }

    @Post("login")
    verifyUser(@Body(ValidationPipe) data: VerifyUserDto): Promise<any> {
        return this.userService.verifyUser(data);
    }
}
