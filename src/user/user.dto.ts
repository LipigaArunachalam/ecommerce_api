import {IsString,  IsNotEmpty} from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    email : string;
    @IsString()
    username : string;
    @IsString()
    password : string;
    @IsString()
    role : string;
    @IsString()
    zip_code : number;
    @IsString()
    city : string;
    @IsString()
    state : string;
}

export class VerifyUserDto{
    @IsNotEmpty()
    @IsString()
    email : string;
    @IsString()
    password : string;
    @IsString()
    username?: string;
}
