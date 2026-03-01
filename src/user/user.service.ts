import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from '../schema/user.schema';
import { CreateUserDto, VerifyUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(@InjectModel(user.name) private UserModel: Model<user>) { }

    async create(nuser: CreateUserDto) {
        const hashedPass = await bcrypt.hash(nuser.password, 10);
        const data = await this.UserModel.create({ ...nuser, password: hashedPass });
        return data;
    }
    async getAll() {
        const result = await this.UserModel.find();
        return result;
    }

    async verifyUser(data: VerifyUserDto) {
        const user = await this.UserModel.findOne({ username: data.username });

    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
    }

    return user;
    }
}
