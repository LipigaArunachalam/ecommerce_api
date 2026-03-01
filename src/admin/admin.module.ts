import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { user, UserSchema} from './../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [MongooseModule.forFeature([{name : user.name , schema : UserSchema}])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
