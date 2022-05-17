import {
    Body,
    ConflictException,
    Controller,
    forwardRef,
    Get,
    HttpCode,
    Inject,
    NotFoundException,
    Post,
    Req,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { comparePassword } from '../../utils/bcrypt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Post('signup')
    @HttpCode(201)
    @ApiConflictResponse({ description: 'User already exist.' })
    @ApiCreatedResponse({
        description: 'The user has been successfully created.',
    })
    async signup(@Body() body: CreateUserDto): Promise<void> {
        const duplicatedUser = await this.userService.findOneUser(
            null,
            body.name,
        );
        if (duplicatedUser) throw new ConflictException('User already exist');
        await this.userService.createUser(body);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() body: LoginDto): Promise<{ token: string }> {
        const user = await this.userService.findOneUser(null, body.name);
        if (!user) throw new NotFoundException('User not found');
        //user.password !== body.password, 
        console.log(comparePassword(body.password, user.password));
        if (!comparePassword(body.password, user.password))
            throw new NotFoundException('User not found');
        // if (user.password !== body.password)
        // throw new NotFoundException('User not found');
        const token: string = await this.authService.login(user);
        return { token };
    }

    @Get('logout')
    async logout(@Req() req: Request): Promise<string> {
        this.authService.logout(req.res.locals.token);
        return 'done';
    }
}