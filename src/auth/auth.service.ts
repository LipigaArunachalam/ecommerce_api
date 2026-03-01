import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/schema/user.schema';
import { CreateUserDto, VerifyUserDto } from 'src/user/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(user.name) private userModel: Model<user>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signUp(signupDto: CreateUserDto) {
        const { username, email, password, role } = signupDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        const { accessToken, refreshToken } = await this.getTokens(user.role, user.email);
        await this.userModel.findByIdAndUpdate(user._id.toString(), {
            refresh_token: refreshToken,
        });
        //await this.updateRefreshToken(user._id.toString(), refreshToken);
        return { accessToken, refreshToken };
    }

    async login(loginDto: VerifyUserDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({
            email,
        });

        if (!user) throw new UnauthorizedException('invalid email or password');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            throw new UnauthorizedException('invalid email or password');

        const { accessToken, refreshToken } = await this.getTokens(user.role, user.email);
         await this.userModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken});
        return { accessToken, refreshToken };
    }

    async logout(userId: string) {
        await this.userModel.findByIdAndUpdate(userId, {
            refreshToken: null,
        });
    }

    async refreshTokens(email: string, refreshToken: string) {
        const user = await this.userModel.findOne({ email });
        console.log(user);
        console.log(refreshToken);
        if (!user || !user.refresh_token) {
            throw new UnauthorizedException('Access denied');
        }

        if(user.refresh_token !== refreshToken){
            throw new UnauthorizedException('Access denied');
        }


        const tokens = await this.getTokens(user.role, user.email);
         await this.userModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken});

        return tokens;
    }

    async getTokens(role: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { role, email },
                { secret: this.configService.get('JWT_SECRET'), expiresIn: '2m' },
            ),
            this.jwtService.signAsync(
                { role, email },
                { secret: this.configService.get('REFRESH_TOKEN'), expiresIn: '7d' },
            ),
        ]);

        return { accessToken, refreshToken };
    }
}