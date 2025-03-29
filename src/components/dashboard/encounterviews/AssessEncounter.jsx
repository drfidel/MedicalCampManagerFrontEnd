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
import PrescritionGen from './PrescritionGen';

const AssessEncounter = (props) => {
    const { show, onClose, patientid } = props;

    const [patient, setSinglePatient] = useState([])
    const [editpresps, setEditedPreps] = useState("")

    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false);

    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    const [dataFromChild, setDataFromChild] = useState([]);

    function handleDataFromChild(data) {
      setDataFromChild(data);
      // const pres = data.map((e,k) => "\n"+ e.prespart.toString()+"\n")
      const pres = data.prespart;

      // initialValues.prescription = pres.toString()
      setEditedPreps(pres)
      console.log(data)
    }
    

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        encounterService.getSinglePatientEncounterInfo(patientid)
        .then((response) => {
            setSinglePatient(response.data)
            initialValues.id = response.id,
            initialValues.identity = response.identity,
            initialValues.pt_name = response.pt_name,
            initialValues.pt_age = response.pt_age,
            initialValues.pt_sex = response.pt_sex
            initialValues.presenting_complaint = response.presenting_complaint,
            initialValues.diagnosis = response.diagnosis,
            initialValues.prescription = response.prescription,
            initialValues.labrequest = response.labrequest
            setEditedPreps(response.prescription)
        })

        // if(editpresps != ""){
        //   initialValues.prescription = editpresps.toString()
        // }
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
      identity: ""
    };
  
    const validationSchema = Yup.object().shape({
      pt_name: Yup.string().required("This field is required!"),
      pt_sex: Yup.string().required("This field is required!"),
      pt_age: Yup.string().required("This field is required!"),
    })

    function handleCloseModel(){
      onClose(false)
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
          <Modal.Title>Asess Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card bg-secondary">
            <div class="d-flex justify-content-end flex-row">
                <button class="btn btn-warning btn-sm" onClick={onClose} type="reset"><span>Go back</span></button>
              </div>

              <div class="d-flex flex-column">
                <h3 className="text-center">Patient Assessment</h3>
                
                </div>
            <div className="d-flex flex-column">
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
                
                  <div class="card container col-3">
                  <div class="card-header text-light bg-primary">
                      Patient Identification
                  </div>
                  <div className="form-group">
                  
                    <label htmlFor="pt_name">Patient Name</label>
                    <Field name="pt_name" type="text" className="form-control" placeholder="Akamba" />
                    <ErrorMessage
                      name="pt_name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pt_age">Age</label>
                    <Field name="pt_age" type="number" className="form-control" placeholder="45 years"/>
                    <ErrorMessage
                      name="pt_age"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pt_sex">Sex</label>
                    <Field name="pt_sex" id="pt_sex" className="form-control" as="select">
                        <option value="" selected="">Select your sex</option>
                        <option value="Male">Male</option>
                        <option value="M">M</option>
                        <option value="Female">Female</option>
                        <option value="F">F</option>
                    </Field>
                    <ErrorMessage
                      name="pt_sex"
                      component="div"
                      className="alert alert-danger"
                    />
                    <br/>
                  </div>
                    
                  
                  <div className="form-group">
                    <div class="card-header text-light bg-warning">
                        Triage Data
                    </div>
                    <label htmlFor="sys">Blood Pressure</label>
                    <div className='row'>
                    <div className='col-5'>
                      <Field name="sysbp" type="number" className="form-control" placeholder="sys"/>
                      <Field name="diabp" type="number" className="form-control" placeholder="dias"/>
                    </div>
                    </div>

                    <label htmlFor="weight">Weight</label>
                    <Field name="weight" type="number" className="form-control" placeholder="65 Kgs"/>

                    <label htmlFor="height">Height</label>
                    <Field name="height" type="number" className="form-control" placeholder="165 cm"/>

                    <label htmlFor="bmi">BMI</label>
                    <Field name="bmi" type="number" className="form-control" placeholder="165 cm"/>

                    <label htmlFor="pulse">Pulse</label>
                    <Field name="pulse" type="number" className="form-control" placeholder="65 BPM"/>

                    <label htmlFor="temp">Temperature oC</label>
                    <Field name="temp" type="number" className="form-control" placeholder="37.5 0C"/>
                    <br/>
                  </div>
                    
                 
                  </div>
                  
                  <div class="card container">
                  <div class="card-header text-light bg-primary">
                      Complaints
                  </div>
                  <div className="form-group">
                    <label htmlFor="presenting_complaint">Presenting complaints</label>
                    <Field name="presenting_complaint" as="textarea" className="form-control" placeholder="fever x 1/7"/>
                    <ErrorMessage
                      name="presenting_complaint"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="labrequest">Labs</label>
                    <Field name="labrequest" as="textarea" className="form-control" />
                    <ErrorMessage
                      name="labrequest"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="diagnosis">Diagnosis</label>
                    <Field name="diagnosis" as="textarea" className="form-control" />
                    <ErrorMessage
                      name="diagnosis"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>
                  </div>

                  <div class="card container">
                  <div class="card-header text-light bg-success">
                      Treatment
                  </div>
                  <div className="form-group">
                    <label htmlFor="prescription">Treatment</label>
                    <Field name="prescription" id="prescription" as="textarea" className="form-control"
                      rows="6"/>
                    <ErrorMessage
                      name="prescription"
                      component="div"
                      className="alert alert-danger"
                    />
                    {/* <PrescritionGen sendDataToParent={handleDataFromChild} initpres={editpresps}/> */}
                  </div>

                  </div>
                  </div>

                  <div className="form-group d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary btn-block">
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                      <span>Assess Encounter</span>
                    </button>
                    <button type="reset" className="btn btn-danger btn-block" onClick={onClose}>Cancel</button>
                  </div> 
                    
                  </div>
                  )}
                </Form>
                )}
              </Formik>
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

export default AssessEncounter;