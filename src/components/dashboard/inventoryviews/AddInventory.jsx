import React, { useEffect, useState } from 'react'

import  Modal  from 'react-bootstrap/Modal';
import  Button  from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { clearMessage } from '../../../redux/_slices/message';
import { addencounter } from '../../../redux/_slices/encounter';
import patientService from '../../../redux/_services/patient.service';

const AddInventory = (props) => {
  const { show, onClose, patientid } = props;

  const [patient, setSinglePatient] = useState([])

    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false);

    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        patientService.getSinglePatientInfo(patientid)
        .then((response) => {
            setSinglePatient(response.data)
            initialValues.identity = response.id,
            initialValues.pt_name = response.pt_firstname + " " + response.pt_surname,
            initialValues.pt_age = response.pt_age,
            initialValues.pt_sex = response.pt_gender
        })
    }, [])

    const initialValues = {
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

        dispatch(addencounter({
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
          <Modal.Title>Add New Encounter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card bg-secondary">
            <div class="d-flex justify-content-end flex-row">
                <button class="btn btn-warning btn-sm" onClick={onClose} type="reset"><span>Go back</span></button>
              </div>

              <div class="d-flex flex-column">
                <h3 className="text-center">Enter Encounter Details</h3>
                
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
                
                  <div class="card container">
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
                    <Field name="pt_sex" id="pt_gender" className="form-control" as="select">
                        <option value="" selected="true">Select your sex</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </Field>
                    <ErrorMessage
                      name="pt_sex"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                 
                  </div>
                  
                  <div class="card container">
                  <div className="form-group">
                    <div class="card-header text-light bg-primary">
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
                  </div>
                  </div>
                  </div>

                  <div className="form-group d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary btn-block">
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                      <span>Create Encounter</span>
                    </button>
                    <button type="reset" className="btn btn-danger btn-block" onClick={onClose}>Cancel</button>
                  </div> 
                    
                  </div>
                  )}
                </Form>
                )}
              </Formik>
            </div>

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
                  {message} : Encounter Register successful
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default AddInventory