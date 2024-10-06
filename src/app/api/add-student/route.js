
import connectToDb from "@/app/database/page";
import Student from "@/app/models/page";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import Joi from 'joi';


const Url ='mongodb+srv://student:student123@student.bij9g.mongodb.net/'

 const AddNewStudent= Joi.object({
    name : Joi.string().required(),
    branch: Joi.string().required(), 
    year: Joi.string().required(), 
    contact: Joi.string()
        .pattern(/^[0-9]+$/)   
        .length(10)            
        .required()
        .messages({
            'string.pattern.base': 'Contact number must contain only digits.',
            'string.length': 'Contact number must be exactly 10 digits.',
            'any.required': 'Contact number is required.'
        }),
})

export async function POST(request) {
    const client = new MongoClient(Url);

    try{
        await connectToDb()
        const extractStudetData = await request.json();

        const {name , branch , year , contact} = extractStudetData;
   

        // validation part
        const {error} = AddNewStudent.validate({
           name,branch,year,contact
        })
        if(error){
            return NextResponse.json({
                success : false,
                message :error.details[0].message
            })
        }

        const newlyCreatedStudentItem = await Student.create(extractStudetData)
        if(newlyCreatedStudentItem){
            return NextResponse.json({
                success : true,
                message : 'Student record added successfully'
            })
        }else{
            return NextResponse.json({
                success : false,
                message : 'Something went wrong ! Please try again'
            })
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({
            success : false,
            message : 'Something went wrong ! Please try again'
        })
    }

}