import connectToDb from "@/app/database/page";
import Student from "@/app/models/page";
import { NextResponse } from "next/server";
import Joi from 'joi';

const EditStudent= Joi.object({
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


export async function PUT(request) {
   try {
    await connectToDb();
    
    const {searchParams} = new URL(request.url)
    const getCurrentStudentID = searchParams.get('id');

    if(!getCurrentStudentID){
        return NextResponse.json({
            success : false,
            message : 'Student ID is required'
        })
    }

    const {name, branch , year , contact} = await request.json()

    // validation part
    const {error} = EditStudent.validate({
        name,branch,year,contact
     })
     if(error){
         return NextResponse.json({
             success : false,
             message :error.details[0].message
         })
     }

    const updateCurrentBlogById = await Student.findByIdAndUpdate({_id : getCurrentStudentID},
        {name,branch,year,contact},{new : true}
    )

    if(updateCurrentBlogById){
        return NextResponse.json({
            success : true,
            message:"Student's record  is updated successfully"
        }) 
    }else{
        return NextResponse.json({
            success : false,
            message : 'Something went wrong ! Please try again'
        })
       }

   } catch (error) {
    console.log(e)
    return NextResponse.json({
        success : false,
        message : 'Something went Wrong ! Please try again'
    })
   }
}