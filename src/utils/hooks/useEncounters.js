import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import encounterService from "../../redux/_services/encounter.service";
import { getencounters } from "../../redux/_slices/encounter";


const useEncounters = () => {

    const [encounters, setEncounters] = useState([]);
    const [pgCount, setCount ] = useState();
    const [page, setPage ] = useState(1);
    const [nextpage, setNextPage] = useState("");
    const [previouspage, setPreviousPage] = useState("");
    const [error, setError] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
  
        encounterService.getAllPatientEncounters(page).then(
          (response) => {
    
            if(response.results){
    
              setEncounters(response.results);
              setCount(response.count)
              setNextPage(response.next)
              setPreviousPage(response.previous)
              setError(null)
    
            } else {
    
              setEncounters([])
              setCount(0)
              setError(response)
    
            }
          }
        ).catch((error) => {
          setEncounters([])
          setCount(0)
          setError(error)
        })

        //this is triggered incase patients state changes
        //dispatch(getencounters())
        
      }, [pgCount]);

    return  { encounters, pgCount,page, nextpage, previouspage, error };

}

export default useEncounters;