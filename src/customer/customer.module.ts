import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserSchema} from './../schema/user.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : user.name , schema : UserSchema}])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
