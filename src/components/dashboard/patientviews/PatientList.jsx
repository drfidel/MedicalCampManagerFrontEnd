import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Pagination from '../../common/pagination/pagination';


let PageSize = 10;

const PatientList = () => {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredSearchList, setfilteredSearchList] = useState([]);

  //adding pagination support
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnChange = (e) => {
    e.preventDefault();
    setsearchTerm(e.target.value)
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    
    return filteredSearchList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredSearchList]);


  return (
    <div className="container">
       {/* <h1 className="center-lign"> List of Patients</h1> */}
      {/* <div className="center-lign">
        <button>
          <a href="/cases"> New patient</a>
        </button> 
      </div> */}

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
        totalCount={patients.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
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
          {currentTableData.map((patient, key) =>
            <tr key={key}>
              <td className="table-data">  {patient.id} </td>
              <td className="table-data"> {moment(patient.registration_date).format('DD-MM-YYYY')}</td>
              <td className="table-data"> {patient.pt_name} </td>
              <td className="table-data"> {patient.pt_sex} </td>
              <td className="table-data"> {patient.pt_age} </td>
              <td className="table-data"> 
              <div className="d-flex justify-content-center">
              <Link to={`/cases/${patient.id}`} className="btn btn-outline-primary btn-sm">Edit</Link>
              <button type="button" class="btn btn-outline-danger btn-sm">Delete</button>
              <Link to={`/cases/${patient.id}/gopd/encounter`} className="btn btn-primary btn-sm">New Encounter</Link>
              <Link to={`/cases/${patient.id}/gopd/history`} className="btn btn-secondary btn-sm">History</Link>
              </div>
               </td>
            </tr>
          )}</tbody>
      </table>

      <div className="d-flex justify-content-center">
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={patients.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </div>
    </div>
  )
}

export default PatientList