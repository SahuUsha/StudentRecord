import connectToDb from "@/app/database/page";
import Student from "@/app/models/page";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        await connectToDb();
        const exextractAllStudentFromDatabase = await Student.find({});

        if(exextractAllStudentFromDatabase) {
          return NextResponse.json({
            success : true,
            data : exextractAllStudentFromDatabase,
          });
        }
        else{
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
              });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
    });
    }
 
}
// import connectToDb from "@/app/database/page";
// import Student from "@/app/models/page";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         await connectToDb();
//         const extractAllStudentFromDatabase = await Student.find({}); // Corrected variable name

//         if (extractAllStudentFromDatabase) {
//             return NextResponse.json({
//                 success: true,
//                 data: extractAllStudentFromDatabase,
//             });
//         } else {
//             return NextResponse.json({
//                 success: false,
//                 message: "No students found!",
//             });
//         }
//     } catch (e) {
//         console.log(e);
//         return NextResponse.json({
//             success: false,
//             message: "Something went wrong! Please try again",
//         });
//     }
// }
