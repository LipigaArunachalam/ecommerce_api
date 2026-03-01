import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { user } from 'src/schema/user.schema';

@Controller('customer')
export class CustomerController {
    constructor(private customerService : CustomerService){}

    @Get("all-customer")
    gellAllCustomer(@Query('limit',ParseIntPipe) limit :number, @Query('offset', ParseIntPipe)offset:number): Promise<user[]>{
      return this.customerService.getAllCustomer(limit,offset);
    }

    @Get("count")
    getCount(): Promise<{city :string, count : number}[]>{
        return this.customerService.getCount();
    }

    @Get(":state")
    getByState(@Param('state') state : string) : Promise<user[]>{
        return this.customerService.getByState(state);
    }

    
}
