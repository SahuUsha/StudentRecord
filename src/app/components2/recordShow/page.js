"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AddNewStudent from '../add-new-student/page'

import {Card,
    CardContent,
    CardDescription,
    CardTitle, } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
import { get } from 'mongoose'


const initialStudentFormData={
    name:"",
    branch:"",
    year:"",
    contact:"",
    
}

const ShowStudentRecord =({studentList})=> {
 const [openStudentDialog,  setopenStudentDialog ] = useState(false)
 const [loading, setloading ] = useState(false)
 const [studentFormData, setStudentFormData] = useState(initialStudentFormData)
 const [currentEditStudentID, setCurrentEditStudentID] = useState(null)

console.log(studentFormData)

const router = useRouter();

useEffect(()=>{
    router.refresh();
},[])

const handleSaveStudentRecord=async()=>{
    try{
        setloading(true)
        const apiResponse = currentEditStudentID!==null?await fetch(`/api/update-student?id=${currentEditStudentID}`,{
            method: "PUT",
            body: JSON.stringify(studentFormData)
        }): await fetch('/api/add-student',{
            method : "POST",
            body :JSON.stringify(studentFormData),
        })
        const result = await apiResponse.json()


        if(result?.success){
            console.log(studentFormData)
            setStudentFormData(initialStudentFormData)
            console.log(studentFormData)
            setopenStudentDialog(false)
            setloading(false)
            setCurrentEditStudentID(null)
            router.refresh()
        }
    }catch(e){
        console.log(e)
        setloading(false)
        setStudentFormData(initialStudentFormData)
    }
}

const handleDeleteRecordByID=async(getCurrentStudentId)=>{
    try{
        const apiResponse = await fetch(`/api/delete-student?id=${getCurrentStudentId}`,{
             method : 'DELETE'
        })
        const result = await apiResponse.json();
        if(result?.success){
            router.refresh()
          }

    }catch(e){
        console.log(e); 
    }
}

const handleEditRecord=async(getCurrentStudent)=>{
    setCurrentEditStudentID(getCurrentStudent?._id)
    setStudentFormData({
        name : getCurrentStudent?.name,
        branch : getCurrentStudent?.branch,
        year : getCurrentStudent?.year,
        contact : getCurrentStudent?.contact,

    })
   setopenStudentDialog(true)
}

 return(
    <div className="min-h-screen flex flex-col px-10 py-10 bg-gradient-to-r from-gray-300 to-gray-400  ">
        <AddNewStudent
          openStudentDialog={openStudentDialog}
          setopenStudentDialog ={setopenStudentDialog}
          loading={loading}
          setloading={setloading}
          studentFormData={studentFormData}
          setStudentFormData={setStudentFormData}
          handleSaveStudentRecord={handleSaveStudentRecord}
          currentEditStudentID={currentEditStudentID}
          setCurrentEditStudentID={setCurrentEditStudentID}
        />
     <div>
        <h3  className="text-3xl font-semibold text-center  text-4xl text-slate-800 ">Students Record</h3>
     </div>
     <div className='flex justify-center items-center'>
     <div className='flex flex-wrap w-auto shadow-xl shadow-gray-600 bg-gray-400 rounded-2xl p-12 gap-7 sm:grid-cols-2 justify-center flex   mt-6'>
        {
            studentList && studentList.length>0?
            studentList.map((item)=>
                <Card className="p-5" key={item._id}>
            <CardContent>
             <CardTitle className="p-3 mb-3">Name : {item.name}</CardTitle>
             <CardTitle className="p-3 mb-3">Branch : {item.branch}</CardTitle>
             <CardTitle className="p-3 mb-3">Year : {item.year}</CardTitle>
             <CardTitle className="p-3 mb-3">Contact : {item.contact}</CardTitle>
             

             
             <div className='mt-5 flex gap-5  items-center'>
             <Button className="cursor-pointer px-10 text-[1rem] text-white text-xl bg-slate-800 " onClick = {()=>handleEditRecord(item) }  >Edit</Button>
             <Button className="cursor-pointer px-10 text-[1rem] text-white text-xl bg-slate-800 " onClick={()=>handleDeleteRecordByID(item._id)}>Delete</Button>
             </div>
            </CardContent>
         </Card>

            )
            :<label className='text-4xl text-white font-bold mb-4 flex justify-center items-center text-center '>No one Student's record Found. please add at least One student's record</label>
        }
     </div>
     </div>
    </div>
 )


}
export default ShowStudentRecord