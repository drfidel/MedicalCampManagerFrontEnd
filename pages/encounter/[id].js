import { useRouter } from 'next/router';
import React, { useState } from 'react'
import AddEncounter from '../../src/components/dashboard/encounterviews/AddEncounter';

const Id = () => {

    //state for path index-number
    const longpathid = window.location.pathname.split("/", 3).slice(2).toString()

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
    <AddEncounter show={show} onClose={handleClose} patientid={longpathid}/>
  )
}

export default Id