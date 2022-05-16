import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Put,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUserInfo(@Req() request: Request): Promise<User> {
        return request.res.locals.user;
    }

    @Put()
    async updateUserProfile(
        @Req() request: Request,
        @Body() body: UpdateUserDto,
    ): Promise<User> {
        const user: User = request.res.locals.user;
        const newUserInfo: User = await this.userService.updateUserInfo(user, body);
        return newUserInfo;
    }

    @Delete()
    async deleteAccount(@Req() request: Request): Promise<void> {
        const user: User = request.res.locals.user;
        await this.userService.deleteAccount(user);
    }
}
