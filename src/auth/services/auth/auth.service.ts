import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../user/services/users/users.service';
import { User } from '../../../user/entities/user.entity';
import { JwtPayload } from '../../model/jwt-payload,model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) return user;
        return null;
    }

    generateJWT(user: User) {
        const payload: JwtPayload = { role: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
