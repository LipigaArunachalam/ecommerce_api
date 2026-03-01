import {IsString,IsUUID, IsBoolean ,IsNotEmpty, IsNumber} from "class-validator";

export class CreateCustomerDto{
    @IsNotEmpty()
    @IsString()
    customer_id : string;

    @IsUUID('4')
    customer_unique_id : string;

    @IsNumber()
    customer_zip_code_prefix : number;

    @IsString()
    customer_city : string;

    @IsString()
    customer_state : string;
}