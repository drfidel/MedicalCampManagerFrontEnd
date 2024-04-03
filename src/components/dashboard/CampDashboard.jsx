import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import  Modal  from 'react-bootstrap/Modal';
import  Button  from 'react-bootstrap/Button';
import AddPatient from './patientviews/AddPatient';
import PatientList from './patientviews/PatientList';
import AppointmentList from './encounterviews/AppointmentList';



const CampDashboard = props => {
  
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false); //submit form data as form closes


  if(!isLoggedIn) {
    router.push('/')
  }

  return (
    <div>
        <div className="nav nav-tabs col-lg" id="nav-tab" role="tablist">
            <button className="nav-link" id="nav-reception-tab" data-bs-toggle="tab" data-bs-target="#nav-reception" type="button" role="tab" 
            aria-controls="nav-reception" aria-selected="false" style={{color: "#A2B"}}>Reception</button>

            <button className="nav-link" id="nav-appointments-tab" data-bs-toggle="tab" data-bs-target="#nav-appointments" type="button" role="tab" 
            aria-controls="nav-appointments" aria-selected="false" style={{color: "#A2B"}}>Appointments</button>

            <button className="nav-link" id="nav-laboratory-tab" data-bs-toggle="tab" data-bs-target="#nav-laboratory" type="button" role="tab" 
            aria-controls="nav-laboratory" aria-selected="false" style={{color: "#A2B"}}>Laboratory</button>

            <button className="nav-link" id="nav-pharmacy-tab" data-bs-toggle="tab" data-bs-target="#nav-pharmacy" type="button" role="tab" 
            aria-controls="nav-pharmacy" aria-selected="false" style={{color: "#A2B"}}>Pharmacy/Dispensing</button>

            <button className="nav-link" id="nav-inventory-tab" data-bs-toggle="tab" data-bs-target="#nav-inventory" type="button" role="tab" 
            aria-controls="nav-inventory" aria-selected="false" style={{color: "#A2B"}}>Inventory</button>

            <button className="nav-link" id="nav-reports-tab" data-bs-toggle="tab" data-bs-target="#nav-reports" type="button" role="tab" 
            aria-controls="nav-reports" aria-selected="false" style={{color: "#A2B"}}>Reports</button>

            <button className="nav-link" id="nav-admin-tab" data-bs-toggle="tab" data-bs-target="#nav-admin" type="button" role="tab" 
            aria-controls="nav-admin" aria-selected="false" style={{color: "#A2B"}}>Administration</button>
        </div>

        <div className="tab-content" id="nav-tabContent" >
                <div className="tab-pane fade" id="nav-reception" role="tabpanel" aria-labelledby="nav-reception-tab">
                <div className="d-flex justify-content-center mt-2 me-2">
                        <button className="btn" style={{backgroundColor: "#A2B", color:"#fff"}} onClick={handleShow}> Add New Patient</button> <span/>
                          <>
                            <AddPatient show={show} onClose={handleClose}/>
                          </>
                          
                        {/* <a href="/" className="btn" style={{backgroundColor: "#A2B", color:"#fff"}}> Revisit</a> */}
                              
                    </div>
                    <div className="d-flex justify-content-center">
                      <PatientList/>
                    </div>
                    
                </div>

                <div className="tab-pane fade" id="nav-appointments" role="tabpanel" aria-labelledby="nav-appointments-tab">
                
                  
                  {/* Horizontal Nav-tabs */}
                  <div className="d-flex justify-content-center">
                      <AppointmentList/>
                    </div>

                  {/* End of Horizontal Nav-Tabs */}

                
                </div>
                <div className="tab-pane fade" id="nav-laboratory" role="tabpanel" aria-labelledby="nav-laboratory-tab">

                   {/* Horizontal Nav-tabs */}
                   <br/>   

                    {/* End of Horizontal Nav-Tabs */}
                </div>
                    

                <div className="tab-pane fade" id="nav-pharmacy" role="tabpanel" aria-labelledby="nav-pharmacy-tab">...pharmacy</div>

                <div className="tab-pane fade" id="nav-inventory" role="tabpanel" aria-labelledby="nav-inventory-tab">...inventory</div>

                <div className="tab-pane fade" id="nav-reports" role="tabpanel" aria-labelledby="nav-reports-tab">...report</div>

                <div className="tab-pane fade" id="nav-admin" role="tabpanel" aria-labelledby="nav-admin-tab">...admin</div>
        </div>
    </div>
  )
}

CampDashboard.propTypes = {}

export default CampDashboard;