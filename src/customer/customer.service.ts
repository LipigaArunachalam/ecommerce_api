import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {user} from './../schema/user.schema';
import { CreateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(user.name) private CustomerModel : Model<user> ){}

    async getAllCustomer(limit:number,offset:number){
        //const data = await this.CustomerModel.find({is_deleted : false});
        const data = await this.CustomerModel.aggregate([
            {
                $match : {is_deleted : false,
                    $text: { $search: "customer" }}
            },
            {
                $skip: Number(offset),
            },
            {
                $limit: Number(limit),
            },
            {
                $project : {
                    _id : 0,
                    customer_id : "$user_id",
                    customer_name : "$username",
                    customer_email: "$email",
                    customer_city : "$city",
                    customer_state : "$state",
                    customer_zip_code: "$zip_code",
                }
            }
        ]);
        return data;
    }

    async getByState(state){
        const data = await this.CustomerModel.find({state :  {$regex : `^${state}$` , $options : "i"}, is_deleted:false}).limit(10);
        return data;
    }

    async getCount(){
        const data = await this.CustomerModel.aggregate([
            {
                $match:{is_deleted : false,
                    $text: { $search: "customer" }
                }
            },
            {
                $group:{
                    _id: "$city",
                    count : {$sum :1},
                }
           },
           {
                $project :{
                    city : '$_id',
                    count : 1,
                    _id :0
                }
           },
           {
               $sort : {count: -1}
           }
        ])
        return data;
    }

}
