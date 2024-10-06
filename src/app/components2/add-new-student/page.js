"use client"

import {useState} from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
  
    DialogFooter,
    DialogHeader,
    DialogTitle,

  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"


const AddNewStudent = ({
    openStudentDialog , setopenStudentDialog , loading , setloading , studentFormData ,setStudentFormData, handleSaveStudentRecord,currentEditStudentID,setCurrentEditStudentID,
})=>{

    return(
        <div>
        <div className='p-8'>
            <Button className="cursor-pointer text-white text-xl bg-slate-800  text-[1.3rem] px-11 py-7 rounded-lg" onClick={()=>setopenStudentDialog(true)} >Add Student Record</Button>
        </div>
        <Dialog  
          open={openStudentDialog}
          onOpenChange={(isOpen)=>{
            if(!isOpen){
                setopenStudentDialog(false)
                setStudentFormData({
                    name:"",
                    branch:"",
                    year:"",
                    contact:"",
                });
                setCurrentEditStudentID(null);
            }
          }}
        >
 
         <DialogContent className="sm:max-w-[425px]">
         <DialogHeader>
      <DialogTitle>{currentEditStudentID? " Edit Record" : "Add New Student's Record"}</DialogTitle>
              </DialogHeader>
         <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right  font-bold text-xl">
                Name : 
              </Label>
              <Input
                  name ="name"
                  id="name"
                 placeholder="Enter student name"
                 value = {studentFormData.name}
                 className = "w-[15rem] text-[1.2rem] "
                 onChange = {(event)=>setStudentFormData({
                    ...studentFormData , 
                    name:event.target.value
                 })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branch" className="text-right font-bold text-xl">
                Branch :
              </Label>
              <Input
                  name ="branch"
                  id="branch"
                 placeholder="Enter branch"
                 value = {studentFormData.branch}
                 className = "w-[15rem] text-[1.2rem] "
                 onChange = {(event)=>setStudentFormData({
                    ...studentFormData , 
                    branch:event.target.value
                 })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right  font-bold text-xl">
                Year :
              </Label>
              <Input
                  name ="year"
                  id="year"
                 placeholder="Enter year"
                 value = {studentFormData.year}
                 className = "w-[15rem] text-[1.2rem] "
                 onChange = {(event)=>setStudentFormData({
                    ...studentFormData , 
                    year:event.target.value
                 })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right  font-bold text-xl">
                Contact:
              </Label>
              <Input
                  name ="contact"
                  id="contact"
                 placeholder="Enter roll Number"
                 value = {studentFormData.contact}
                 className = "w-[15rem] text-[1.2rem] "
                 onChange = {(event)=>setStudentFormData({
                    ...studentFormData , 
                    contact:event.target.value
                 })}
              />
            </div>
              <p className='text-red-500'>Contact No. should be 10-digit otherwise it won't save</p>
         </div>
         <DialogFooter>
          <Button onClick={handleSaveStudentRecord} type="button" className="cursor-pointer px-8 py-5 text-[1rem] text-white text-xl bg-slate-800 ">
            {

                loading? 'Saving changes' : 'Save changes'
                
            }
            </Button>
        </DialogFooter>
  </DialogContent>
</Dialog>

        </div> 
    )
}

export default AddNewStudent