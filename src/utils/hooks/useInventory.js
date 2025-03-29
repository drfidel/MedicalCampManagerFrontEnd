import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import inventoryService from "../../redux/_services/inventory.service";
import { getinventories } from "../../redux/_slices/inventory";

const useInventory = () => {

    const [inventories, setInventories] = useState([]);
    const [pgCount, setCount ] = useState();
    const [page, setPage ] = useState(1);
    const [nextpage, setNextPage] = useState("");
    const [previouspage, setPreviousPage] = useState("");
    const [error, setError] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
  
        inventoryService.getAllInventories(page).then(
          (response) => {
    
            if(response.results){
    
              setInventories(response.results);
              setCount(response.count)
              setNextPage(response.next)
              setPreviousPage(response.previous)
              setError(null)
    
            } else {
    
              setInventories([])
              setCount(0)
              setError(response)
    
            }
          }
        ).catch((error) => {
          setInventories([])
          setCount(0)
          setError(error)
        })

        //this is triggered incase patients state changes
        //dispatch(getinventories())
        
      }, [pgCount]);

    return  { inventories, pgCount,page, nextpage, previouspage, error };

}

export default useInventory;