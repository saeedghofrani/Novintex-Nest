import {
  forwardRef,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private authService: AuthService,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerToken: string = req.headers['authorization'];
    if (!bearerToken) throw new UnauthorizedException('Bearer token required.');
    const token: string = bearerToken.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException('Token required.');
    const userId: number = await this.authService.keyv.get(token);
    if (!userId) throw new UnauthorizedException('Token expired.');
    const user: User = await this.userService.findOneUser(userId, undefined);
    if (!user) throw new UnauthorizedException();
    req.res.locals.user = user;
    req.res.locals.token = token;
    next();
  }
}
