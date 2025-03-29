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

const InventoryDetail = (props) => {
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
      const pres = data.map((e,k) => k + "-" +e.prespart.toString()+"\n")

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
            setSinglePatient(response.pt_name)
            initialValues.id = response.id,
            initialValues.identity = response.identity,
            initialValues.pt_name = response.pt_name,
            initialValues.pt_age = response.pt_age,
            initialValues.pt_sex = response.pt_sex
            initialValues.presenting_complaint = response.presenting_complaint,
            initialValues.diagnosis = response.diagnosis,
            initialValues.prescription = response.prescription,
            initialValues.labrequest = response.labrequest
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
          <Modal.Title>Inventory Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card bg-secondary">
            <div class="d-flex justify-content-end flex-row">
                <button class="btn btn-warning btn-sm" onClick={onClose} type="reset"><span>Go back</span></button>
              </div>

              <div class="d-flex flex-column">
                <h3 className="text-center">Inventory Name: <span className='text-danger'>{patient}</span></h3>
                
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
                      
                  </div>
                  <div className="form-group">
                  
                    <label htmlFor="pt_name" className='text-primary'>Product name</label>
                    <Field name="pt_name" type="text" className="form-control" placeholder="CEFTRIAXONE IV (EPICEFIN)" />
                    <ErrorMessage
                      name="pt_name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pt_age" className='text-primary'>Product Number</label>
                    <Field name="pt_age" type="number" className="form-control" placeholder="45452"/>
                    <ErrorMessage
                      name="pt_age"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="diagnosis" className='text-primary'>Category</label>
                    <Field name="diagnosis" as="textarea" className="form-control" />
                    <ErrorMessage
                      name="diagnosis"
                      component="div"
                      className="alert alert-danger"
                    /></div>
                
                <div className="form-group">
                    <label htmlFor="diagnosis" className='text-primary'>Supplier</label>
                    <Field name="diagnosis" as="textarea" className="form-control" />
                    <ErrorMessage
                      name="diagnosis"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>
                  
                    
                 
                  </div>
                  
                  <div class="card container">
                  <div class="card-header text-light bg-primary">
                      
                  </div>
                  <div className="form-group">
                    <label htmlFor="presenting_complaint" className='text-primary'>Cost Price</label>
                    <Field name="presenting_complaint" as="textarea" className="form-control" placeholder="fever x 1/7"/>
                    <ErrorMessage
                      name="presenting_complaint"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="labrequest" className='text-primary'>Selling Price</label>
                    <Field name="labrequest" as="textarea" className="form-control" />
                    <ErrorMessage
                      name="labrequest"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="diagnosis" className='text-primary'>Expiry Date</label>
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
                      Product Details
                  </div>
                  <div className="form-group">
                    <label htmlFor="prescription" className='text-primary'>Properties</label>
                    <Field name="prescription" id="prescription" as="textarea" className="form-control" rows="6"/>
                    <ErrorMessage
                      name="prescription"
                      component="div"
                      className="alert alert-danger"
                    />
                    {/* <PrescritionGen sendDataToParent={handleDataFromChild}/> */}
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

export default InventoryDetail;