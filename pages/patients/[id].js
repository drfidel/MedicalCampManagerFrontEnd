import { useRouter } from 'next/router';
import React, { useState } from 'react'
import EditPatient from '../../src/components/dashboard/patientviews/EditPatient'

const Id = () => {

  //state for path index-number
  const longpathid = window.location.pathname.split("/", 3).slice(2).toString()

  const [showedit, setShowEdit] = useState(true);
  const router = useRouter()

  const handleShowEdit = () => {
    setShowEdit(true)
  };
  
  const handleCloseEdit = () => {
    setShowEdit(false) 
    router.push("/dashboard")
    
  }; //submit form data as form closes

  return (
    <EditPatient showedit={showedit} onCloseEdit={handleCloseEdit} patientid={longpathid}/>
  )
}

export default Id