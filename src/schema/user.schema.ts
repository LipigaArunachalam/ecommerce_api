
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class user  extends Document{
  @Prop({isRequired:true, unique:true})
  username: string;

  @Prop({isRequired:true})
  password: string;

  @Prop({isRequired:true,unique:true})
  email: string;

  @Prop({isRequired:true})
  role: string;

  @Prop({default:null})
  refresh_token?: string;

  @Prop({default:false, select : false})
  is_deleted : boolean;

  @Prop({default:true})
  is_active : boolean;

  @Prop({isRequired:false})
  city: string;

  @Prop({isRequired:false})
  state: string;

  @Prop({isRequired:false})
  zip_code: number;
}

export const UserSchema = SchemaFactory.createForClass(user);
