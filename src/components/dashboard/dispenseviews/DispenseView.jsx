import React, { useEffect, useState, useRef } from 'react'
import  Modal  from 'react-bootstrap/Modal';
import  Button  from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { clearMessage } from '../../../redux/_slices/message';
import { editencounter } from '../../../redux/_slices/encounter';
import patientService from '../../../redux/_services/patient.service';
import encounterService from '../../../redux/_services/encounter.service';
import PrescritionGen from '../encounterviews/PrescritionGen';
import DispenseTable from './DispenseTable';

let nextId = 0;

const DispenseView = (props) => {
    const { show, onClose, patientid } = props;

    const [patient, setSinglePatient] = useState([])
    const [editpresps, setEditedPreps] = useState("")

    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false);

    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    const [dataFromChild, setDataFromChild] = useState([]);

    const [dispense_rx, setDispenseRx] = useState([]);


    function handleDataFromChild(data) {
      setDataFromChild(data);
      const pres = data.map((e,k) => k + " - " + e.prespart.toString() + "\n")

      initialValues.prescription = pres.toString()
      setEditedPreps(pres.toString())
      console.log(pres.toString())
    }

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        encounterService.getSinglePatientEncounterInfo(patientid)
        .then((response) => {
            setSinglePatient(response)
            // initialValues.id = response.id,
            // initialValues.identity = response.identity,
            // initialValues.pt_name = response.pt_name,
            // initialValues.pt_age = response.pt_age,
            // initialValues.pt_sex = response.pt_sex
            // initialValues.presenting_complaint = response.presenting_complaint,
            // initialValues.diagnosis = response.diagnosis,
            // initialValues.prescription = response.prescription,
            // initialValues.labrequest = response.labrequest
        })
    }, [])

    const initialValues = {
      id: "",
      pt_name: "",
      pt_sex: "",
      pt_age: "",
      presenting_complaint: "",
      diagnosis:"",
      prescription: "",
      labrequest: "",
      identity: "",
      prescription_dispensed: []
    };
  
    const validationSchema = Yup.object().shape({
      pt_name: Yup.string().required("This field is required!"),
      pt_sex: Yup.string().required("This field is required!"),
      pt_age: Yup.string().required("This field is required!"),
    })

    function handleCloseModel(){
      onClose(false)
    }

    //add a new prescription
    const handleAddPrescription = (event) => {

      console.log(event.target.form[1].value)
      const pres = {
        route: event.target.form[0].value,
        drugname: event.target.form[1].value,
        dosing: event.target.form[2].value,
        units: event.target.form[3].value,
        freq: event.target.form[4].value,
        duration: event.target.form[5].value,
      };
      setDispenseRx((dispense_rx) => dispense_rx.concat([{pres: pres}]))

    }

    //Delete a prescription added
    const handleDelete = (id) => {

     const index = dispense_rx.findIndex(item => item.id === id)
     
     if(index !== -1){
        const newArray = [...dispense_rx.slice(0,index), ...dispense_rx.slice(index + 1)] 
        setDispenseRx(newArray);
      }
    }


    const handleRegister = (fields) => {

      const { 
          id,
          pt_name,
          pt_sex,
          pt_age,
          presenting_complaint,
          diagnosis,
          prescription,
          labrequest,
          identity
        } = fields;
      
        setSuccessful(false)
        setLoading(true);

        dispatch(editencounter({
            id,
            pt_name,
            pt_sex,
            pt_age,
            presenting_complaint,
            diagnosis,
            prescription,
            labrequest,
            identity
        }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
          setLoading(false);
  
        })
        .catch(() => {
          setLoading(false);
        });

        if(successful) {
          onClose(false)
        }
    }
  

  return (
    <>
        <Modal size='xl' show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card bg-secondary">
            <div class="d-flex justify-content-end flex-row">
                <button class="btn btn-warning btn-sm" onClick={onClose} type="reset"><span>Go back</span></button>
              </div>

              <div class="d-flex flex-row">
                <h4 className="text-center">Patient Name: <span className='text-light'>{patient.pt_name}</span></h4>
                <h4 className="text-center col-4">Patient No: <span className='text-light'>{patient.identity}</span></h4>
                <h4 className="text-center col-4">Encounter No: <span className='text-light'>{patient.id}</span></h4>
                
                </div>

                <div className='d-flex m-1'>
                <div className='d-flex col-sm'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4>Prescription Listing</h4>
                            <div className='text-dark'>
                                <p>{patient.prescription}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                
                </div>

                <div className="d-flex flex-column m-2">
                
              <Formik 
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
              >
                {({errors, touched}) => (
                <Form>
                  { !successful && (
                  <div>
                  <div class="d-flex">
                
                  <div class="card container col">
                  <div class="card-header text-light bg-primary">
                      
                  </div>
                  <div className="form-group">

                  <label htmlFor="rx_route" className='text-primary'>Route</label>
                    <Field name="rx_route" id="rx_route" className="form-control p-2" as="select">
                        <option value="ORAL" selected="true">Oral</option>
                        <option value="IV">IV</option>
                        <option value="IM">IM</option>
                        <option value="SC">SC</option>
                    </Field>
                  
                    <label htmlFor="rx_name" className='text-primary'>Drug name</label>
                    <Field name="rx_name" id="rx_name" className="form-control p-2" as="select">
                        <option value="" selected="true">Drug</option>
                        <option value="AMOXICLAV-TAB">AMOXICLAV TAB</option>
                        <option value="PANADOL-TAB">PANADOL TAB</option>
                        <option value="AMOXYL-CAP">AMOXYL CAP</option>
                    </Field>
                    <ErrorMessage
                      name="rx_name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rx_strength" className='text-primary'>Dose strength</label>
                    <Field name="rx_strength" type="number" className="form-control" placeholder="500"/>
                    <ErrorMessage
                      name="rx_strength"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rx_dose" className='text-primary'>units</label>
                    <Field name="rx_dose" id="rx_dose" className="form-control m-1" as="select">
                        <option value="mg" selected="true">mg</option>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        <option value="dps">drps</option>
                    </Field>
                    <ErrorMessage
                      name="rx_dose"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rx_freq" className='text-primary'>Frequency</label>
                    <Field name="rx_freq" id="pt_stspr" className="form-control m-1 p-1" as="select">
                        <option value="STAT" selected="true">STAT</option>
                        <option value="OD">OD</option>
                        <option value="BD">q12h</option>
                        <option value="TDS">q8h</option>
                        <option value="QID">q6h</option>
                        <option value="q4h">q4h</option>
                        <option value="EOD">EOD</option>
                        <option value="BIW">BIW</option>
                        <option value="TIW">TIW</option>
                    </Field>
                    <ErrorMessage
                      name="rx_freq"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>
                
                <div className="form-group">
                    <label htmlFor="rx_duration" className='text-primary'>Number of days</label>
                    <Field name="rx_duration" id="rx_duration" className="form-control mb-1 p-1" as="select">
                        <option value="1" selected="true">STAT</option>
                        <option value="3">3 d</option>
                        <option value="5">5 d</option>
                        <option value="7">7 d</option>
                        <option value="10">10 d</option>
                        <option value="14">14 d</option>
                        <option value="21">21 d</option>
                        <option value="30">30 d</option>
                    </Field>
                    <ErrorMessage
                      name="rx_duration"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>
                    <button className='btn btn-primary btn-block m-1 col' type="button" onClick={handleAddPrescription}>Add prescription</button>
                  </div>
                  
                  </div>

                  <div>

                  <DispenseTable dispense_rx = {dispense_rx} handleDelete={handleDelete}/>

                  </div>

                  <div className="form-group d-flex justify-content-around mb-2 mt-2">
                    <button type="submit" className="btn btn-primary btn-block">
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                      <span>Confirm Dispensation</span>
                    </button>
                    <button type="reset" className="btn btn-danger btn-block" onClick={onClose}>Cancel</button>
                  </div> 
                    
                  </div>
                  )}
                </Form>
                )}
              </Formik>
            </div>
            </div>
            
            

            {message === "OK" && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  {message} : Encounter Assessment successful
                </div>
              </div>
            )}

            {message === "Network Error" && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
            {message == "Bad Request" && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}

            {message === "Forbidden" && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  Your access is {message}: Please Relogin to continue
                </div>
              </div>
            )}
            
            {message === "Created" && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  {message} : Encounter Assessment successful
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default DispenseView;