import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Error403 from "../../common/403Error";
import Link from 'next/link';
import moment from "moment";
import useEncounters from "../../../utils/hooks/useEncounters";
import { getencounters } from "../../../redux/_slices/encounter";
import Pagination from "../../common/pagination/pagination";

const DispensingList = () => {

    const { user } = useSelector((state) => state.auth);
    const [searchTerm, setsearchTerm] = useState("");
    const [listerror, setError] = useState([]);
    const dispatch = useDispatch();

    //adding pagination support
    const [currentPage, setCurrentPage] = useState(1);
    const [reload, setReload] = useState([]);

    //fetch encounters by page
    const { encounters, pgCount, page, nextpage, previouspage, error } = useEncounters()


    const handleOnChange = (e) => {
        e.preventDefault();
        setsearchTerm(e.target.value)
    }

    const onPageChange = (page) => {
      setCurrentPage(page)
    }

    //check if null then load patients
    useEffect(() => {

      //base fetch
      dispatch(getencounters(currentPage))
      .unwrap()
      .then((response) => {
            if (response){setReload(response.encounters)}
            else{setError(response)} 
      })
      .catch((error) => setError(error))
  
      const refetch = () => {
        if(nextpage){
          dispatch(getencounters(currentPage))
          .unwrap()
          .then((response) => {
            if (response){setReload(response.encounters)}
            else{setError(response)} 
          })
          .catch((error) => setError(error))
        }
  
        if(previouspage){
          dispatch(getencounters(currentPage))
          .unwrap()
          .then((response) => {
            if (response){setReload(response.encounters)}
            else{setError(response)}
          })
          .catch((error) => setError(error))
        }
        
      }
    
      refetch()
      
    }, [currentPage])


    if(error){
      return <Error403 errorstatus={error.status} statusText={error.statusText}/>
    }

    if(!reload){
      return <Error403 errorstatus={listerror.status} statusText={listerror.statusText}/>
    }

  return (
    <div className="container">

      <div class="container-fluid mt-2 mb-2">
        <form class="d-flex">
          <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleOnChange}/>
          <button class="btn btn-primary" type="submit" >Search</button>
        </form>
      </div>
      

      <div>
          <form class="d-flex justify-content-between">
          <div class="form-group">
            <label class="">Filter By Date</label>
            <input class="form-control" type="date" placeholder="Date" aria-label="Date"/>
          </div>
          <div class="form-group">
            <label class="">Admission Status</label>
            <select class="custom-select mr-sm-2" id="exampleFormControlSelect1">
              <option selected>Choose..</option>
              <option>Acute</option>
            </select>
          </div>
          <div class="form-group">
            <label class="">Sort By:</label>
            <select class="custom-select mr-sm-2" id="exampleFormControlSelect2">
              <option selected>Choose..</option>
              <option>Patient Name</option>
            </select>
      </div>
      </form>
      </div>

      <div className="d-flex flex-row-reverse">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={pgCount}
          pageSize={encounters.length}
          onPageChange={onPageChange}
        />
      </div>

      <table className="table table-striped table-hover table-light">
        <thead>
          <tr>
            <th className="table-data"> EID </th>
            <th className="table-data"> PID </th>
            <th className="table-data"> Date </th>
            <th className="table-data"> Name </th>
            <th className="table-data"> Sex </th>
            <th className="table-data"> Age(Yr/m) </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {reload.map((encounter, key) =>
            <tr key={key}>
             <td className="table-data"> {encounter.id} </td>
              <td className="table-data"> {encounter.identity} </td>
              <td className="table-data"> {moment(encounter.visit_date).format('DD-MM-YYYY')}</td>
              <td className="table-data"> {encounter.pt_name} </td>
              <td className="table-data"> {encounter.pt_sex} </td>
              <td className="table-data"> {encounter.pt_age} </td>
              
              <td className="table-data"> 
                <div className="d-flex justify-content-center">
                <Link href={`/dispense/${encounter.id}`} className="btn btn-primary btn-sm m-1">Dispense</Link>
                <button type="button" class="btn btn-warning btn-sm m-1">View Invoice</button>
                </div>
               </td>
            </tr>
          )}</tbody>
      </table>

      <div className="d-flex flex-row-reverse">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={pgCount}
          pageSize={encounters.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default DispensingList