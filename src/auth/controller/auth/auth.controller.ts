import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../../user/entities/user.entity';
import { GetUserParam } from '../../decorator/get-user.decorator';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post()
    @UseGuards(AuthGuard('local'))
    login(@GetUserParam() user: User) {
        return this.authService.generateJWT(user);
    }

}
