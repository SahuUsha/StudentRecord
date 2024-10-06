"use client"

import React from 'react'
import ShowStudentRecord from '../components2/recordShow/page';

const fetchListOfData=async()=>{
    try{
      
        const apiResponse = await fetch("http://localhost:3000/api/get-student",{
            method : "GET",
            cache : "no-store",
        })
        const result =await apiResponse.json();
        return result?.data;
    }catch(error){

        throw new Error(error)
    }
}
const Student=async()=>{
    const studentList = await fetchListOfData();
    console.log(studentList,"studentList");
    return(
        <ShowStudentRecord studentList={studentList}/>
    )
}

export default Student;




