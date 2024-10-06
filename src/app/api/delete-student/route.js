import connectToDb from "@/app/database/page";
import Student from "@/app/models/page";
import { NextResponse } from "next/server";


export async function DELETE(req) {
    try{

     await connectToDb();
     const {searchParams} = new URL(req.url);
     const getCurrentStudentID = searchParams.get('id');
     console.log(getCurrentStudentID)
        if(!getCurrentStudentID){
            return NextResponse.json({
                success : false,
                message : 'Student ID is Required'
            })
        }

        const deleteCurrentStudentById = await Student.findByIdAndDelete(getCurrentStudentID);
        if(deleteCurrentStudentById){
            return  NextResponse.json({
                success : true,
                message : 'Student is deleted successfully'
            })
        }else{
            return NextResponse.json({
                success : false,
                message : 'Something went wrong ! please try again'
              })
        }
    }
    catch(e){
        console.log(e);
        return NextResponse.json({
         success : false,
         message : 'Something went wrong ! please try again'
        });
 
    }
}