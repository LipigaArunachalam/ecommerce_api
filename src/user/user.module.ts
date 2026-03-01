import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserSchema} from '../schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [MongooseModule.forFeature([{ name: user.name, schema: UserSchema }]), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
