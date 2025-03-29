"use client"

import React, { useEffect, useState } from "react";
import Error403 from "../../common/403Error";
import Link from 'next/link'
import moment from "moment";
import usePatients from "../../../utils/hooks/usePatients";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/pagination/pagination";
import { getpatients } from "../../../redux/_slices/patient";

const PatientList = () => {

  const [searchTerm, setsearchTerm] = useState("");
  const { message } = useSelector((state) => state.message)
  const [listerror, setError] = useState([]);
  const dispatch = useDispatch();
  //adding pagination support
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState([]);
  const { patients, pgCount, page, nextpage, previouspage, error } = usePatients()


  const handleOnChange = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value)
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  //check if null then load patients
  //console.log(nextpage.substring(47))
  //console.log(currentPage)
  useEffect(() => {

    //base fetch
    dispatch(getpatients(currentPage))
    .unwrap()
    .then((response) => {
          if (response){setReload(response.patients)}
          else{setError(response)} 
    })
    .catch((error) => setError(error))

    const refetch = () => {
      if(nextpage){
        dispatch(getpatients(currentPage))
        .unwrap()
        .then((response) => {
          if (response){setReload(response.patients)}
          else{setError(response)} 
        })
        .catch((error) => setError(error))
      }

      if(previouspage){
        dispatch(getpatients(currentPage))
        .unwrap()
        .then((response) => {
          if (response){setReload(response.patients)}
          else{setError(response)}
        })
        .catch((error) => setError(error))
      }
      
    }
  
    refetch()
    
  }, [currentPage])
  

  //console.log(reload)
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
            <label class="">Filter By Date - From</label>
            <input class="form-control" type="date" placeholder="Date" aria-label="Date"/>
          </div> To
          <div class="form-group">
            <label class=""> </label>
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
          pageSize={patients.length}
          onPageChange={onPageChange}
        />
      </div>
      

      <table className="table table-striped table-hover table-light">
        <thead>
          <tr>
            <th className="table-data"> ID </th>
            <th className="table-data"> Date </th>
            <th className="table-data"> Name </th>
            <th className="table-data"> Sex </th>
            <th className="table-data"> Age(Yr/m) </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {reload.map((patient, key) =>
            <tr key={key}>
              <td className="table-data"> {patient.id} </td>
              <td className="table-data"> {moment(patient.visit_date).format('DD-MM-YYYY')}</td>
              <td className="table-data"> {patient.pt_firstname} {patient.pt_surname} </td>
              <td className="table-data"> {patient.pt_gender} </td>
              <td className="table-data"> {patient.pt_age} </td>
              <td className="table-data"> 
              <div className="d-flex justify-content-center">
                <div>
                  <Link href={`/patients/${patient.id}`} className="btn btn-outline-primary btn-sm">Edit</Link>                  
                </div>
              
              <button type="button" class="btn btn-outline-danger btn-sm">Delete</button>
              <Link href={`/encounter/${patient.id}`} className="btn btn-primary btn-sm">New Encounter</Link>
              <Link href={`/cases/${patient.id}/gopd/history`} className="btn btn-secondary btn-sm">History</Link>
              </div>
              </td>
            </tr>
            
          )}
          </tbody>
      </table>

     

      <div className="d-flex justify-content-center">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={pgCount}
          pageSize={patients.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default PatientList