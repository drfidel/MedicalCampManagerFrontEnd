import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import patientService from "../../../redux/_services/patient.service";
import Pagination from '../../common/pagination/pagination';
import Link from 'next/link'


let PageSize = 5;

const PatientList = () => {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [patients, setPatients] = useState([]);


  useEffect(() => {
    patientService.getAllPatientsInfo().then(
      (response) => {
        setPatients(response.results);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setPatients(_content);
      }
    );
  }, []);

  //adding pagination support
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnChange = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value)
  }

  console.log(patients)

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
          {patients.map((patient, key) =>
            <tr key={key}>
              <td className="table-data">  {patient.id} </td>
              <td className="table-data"> {patient.visit_date}</td>
              <td className="table-data"> {patient.pt_firstname} {patient.pt_surname} </td>
              <td className="table-data"> {patient.pt_gender} </td>
              <td className="table-data"> {patient.pt_age} </td>
              <td className="table-data"> 
              <div className="d-flex justify-content-center">
              <Link href={`/cases/${patient.id}`} className="btn btn-outline-primary btn-sm">Edit</Link>
              <button type="button" class="btn btn-outline-danger btn-sm">Delete</button>
              <Link href={`/cases/${patient.id}/gopd/encounter`} className="btn btn-primary btn-sm">New Encounter</Link>
              <Link href={`/cases/${patient.id}/gopd/history`} className="btn btn-secondary btn-sm">History</Link>
              </div>
               </td>
            </tr>
          )}</tbody>
      </table>

      <div className="d-flex justify-content-center">
      </div>
    </div>
  )
}

export default PatientList