import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import patientService from "../../redux/_services/patient.service";
import { getpatients } from "../../redux/_slices/patient";


const usePatients = () => {

    const [patients, setPatients] = useState([]);
    const [pgCount, setCount ] = useState();
    const [page, setPage ] = useState(1);
    const [nextpage, setNextPage] = useState("");
    const [previouspage, setPreviousPage] = useState("");
    const [error, setError] = useState([]);
    const dispatch = useDispatch()
  
    useEffect(() => {
        
        patientService.getAllPatientsInfo(page).then(
          (response) => {
            if(response.results){
    
              setPatients(response.results);
              setCount(response.count)
              setNextPage(response.next)
              setPreviousPage(response.previous)
              setError(null)
    
            } else {
    
              setPatients([])
              setCount(0)
              setError(response)
            }
          }
        ).catch((e) => {
          setPatients([])
          setCount(0)
          setError(error)
        })

        //this is triggered incase patients state changes
        //dispatch(getpatients())
        
      }, [pgCount]);


    return { patients, pgCount,page, nextpage, previouspage, error };
}

export default usePatients;