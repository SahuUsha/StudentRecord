import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:String,
    branch:String,
    year:String,
    contact:String,
    
})

const Student = mongoose.models.Student || mongoose.model('Student',StudentSchema)

export default Student;