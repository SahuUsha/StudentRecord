

import React from 'react'
import ShowStudentRecord from '../components2/recordShow/page';

export const revalidate = 0;

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

// "use client";

// import React, { useEffect, useState } from 'react';
// import ShowStudentRecord from '../components2/recordShow/page';

// const Student = () => {
//     const [studentList, setStudentList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchListOfData = async () => {
//             try {
//                 const apiResponse = await fetch("http://localhost:3000/api/get-student", {
//                     method: "GET",
//                     cache: "no-store",
//                 });
//                 const result = await apiResponse.json();
//                 setStudentList(result?.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching student data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchListOfData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return <ShowStudentRecord studentList={studentList} />;
// };

// export default Student;
