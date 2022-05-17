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
import { UserNoin } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUserInfo(@Req() request: Request): Promise<UserNoin> {
        return request.res.locals.user;
    }

    @Put()
    async updateUserProfile(
        @Req() request: Request,
        @Body() body: UpdateUserDto,
    ): Promise<UserNoin> {
        const user: UserNoin = request.res.locals.user;
        const newUserInfo: UserNoin = await this.userService.updateUserInfo(user, body);
        return newUserInfo;
    }

    @Delete()
    async deleteAccount(@Req() request: Request): Promise<string> {
        const user: UserNoin = request.res.locals.user;
        await this.userService.deleteAccount(user);
        return 'done';
    }
}
