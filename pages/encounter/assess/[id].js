import { useRouter } from 'next/router';
import React, { useState } from 'react'
import AssessEncounter from '../../../src/components/dashboard/encounterviews/AssessEncounter';

const Id = () => {

  //state for path index-number
  const longpathid = window.location.pathname.split("/", 4).slice(3).toString()

  const [show, setShow] = useState(true);
  const router = useRouter()

  const handleShow = () => {
      setShowEdit(true)
  };

  const handleClose = () => {
      setShow(false) 
      router.push("/dashboard")
  
  }; //submit form data as form closes

  return (
    <AssessEncounter show={show} onClose={handleClose} patientid={longpathid}/>
  )
}

export default Id