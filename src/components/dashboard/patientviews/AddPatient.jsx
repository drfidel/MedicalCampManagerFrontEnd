import React, { useEffect, useState } from 'react'
import  Modal  from 'react-bootstrap/Modal';
import  Button  from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { clearMessage } from '../../../redux/_slices/message';
import { addpatient } from '../../../redux/_slices/patient';

const AddPatient = (props) => {
    const { show, onClose } = props;

    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false);

    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
      pt_salutation: "",
      pt_firstname: "",
      pt_surname: "",
      pt_gender: "",
      pt_age: "",
      pt_religion: "",
      pt_village:"",
      pt_parish: "",
      pt_subcounty: "",
      pt_district: "",
      pt_contact: "",
      pt_profession: "",
      pt_nationality: "",
      pt_nin: ""
    };
  
    const validationSchema = Yup.object().shape({
      pt_surname: Yup.string().required("This field is required!"),
      pt_firstname: Yup.string().required("This field is required!"),
      pt_age: Yup.string().required("This field is required!"),
      pt_gender: Yup.string().required("This field is required!"),
    })

    function handleCloseModel(){
      onClose(false)
    }

    const handleRegister = (fields) => {

      const { 
          pt_salutation,
          pt_firstname,
          pt_surname,
          pt_gender,
          pt_age,
          pt_religion,
          pt_village,
          pt_parish,
          pt_subcounty,
          pt_district,
          pt_contact,
          pt_profession,
          pt_nationality,
          pt_nin
        } = fields;
      
        setSuccessful(false)
        setLoading(true);

        dispatch(addpatient({
          pt_salutation,
          pt_firstname,
          pt_surname,
          pt_gender,
          pt_age,
          pt_religion,
          pt_village,
          pt_parish,
          pt_subcounty,
          pt_district,
          pt_contact,
          pt_profession,
          pt_nationality,
          pt_nin
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
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card bg-secondary">
            <div class="d-flex justify-content-end flex-row">
                <button class="btn btn-warning btn-sm" onClick={onClose} type="reset"><span>Go back</span></button>
              </div>

              <div class="d-flex flex-column">
                <h3 className="text-center">Enter Patient Details</h3>
                
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
                  <label htmlFor="pt_salutation">Salutation</label>
                    <Field name="pt_salutation" as="select" className="form-control">
                        <option value="" selected="true">Select</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Eng.">Eng.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss.">Miss.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Jus.">Jus.</option>
                        <option value="Sgt.">Sgt.</option>
                        <option value="Maj.">Maj.</option>
                    </Field>
                    <ErrorMessage
                      name="pt_salutation"
                      component="div"
                      className="alert alert-danger"
                    />
                    <label htmlFor="pt_surname">Surname</label>
                    <Field name="pt_surname" type="text" className="form-control" placeholder="Akamba" />
                    <ErrorMessage
                      name="pt_surname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pt_firstname">First Name</label>
                    <Field name="pt_firstname" type="text" className="form-control" placeholder="Joseph"/>
                    <ErrorMessage
                      name="pt_firstname"
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
                    <label htmlFor="pt_gender">Sex</label>
                    <Field name="pt_gender" id="pt_gender" className="form-control" as="select">
                        <option value="" selected="true">Select your sex</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </Field>
                    <ErrorMessage
                      name="pt_gender"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pt_religion">Religion</label>
                    <Field name="pt_religion" as="select" className="form-control" placeholder="Catholic">
                        <option value="" selected="true">Select...</option>
                        <option value="Catholic">Catholic</option>
                        <option value="Anglican">Anglican</option>
                        <option value="Islam">Islam</option>
                        <option value="Adventist">Adventist</option>
                        <option value="Born-again">Born-again</option>
                        <option value="others">Others</option>
                    </Field>
                    <ErrorMessage
                      name="pt_religion"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                 
                  </div>
                  
                  <div class="card container">
                  <div class="card-header text-light bg-primary">
                      Patient Address
                  </div>
                  <div className="form-group">
                    <label htmlFor="pt_village">Village Name</label>
                    <Field name="pt_village" type="text" className="form-control" placeholder="kyalo"/>
                    <ErrorMessage
                      name="pt_village"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="pt_parish">Parish</label>
                    <Field name="pt_parish" type="text" className="form-control" />
                    <ErrorMessage
                      name="pt_parish"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="pt_subcounty">Sub-County</label>
                    <Field name="pt_subcounty" type="text" className="form-control" />
                    <ErrorMessage
                      name="pt_subcounty"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="pt_district">District</label>
                    <Field name="pt_district" type="text" className="form-control" />
                    <ErrorMessage
                      name="pt_district"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>
                  </div>

                  <div class="card container">
                  <div class="card-header text-light bg-primary">
                      Patient Work
                  </div>
                  <div className="form-group">
                    <label htmlFor="pt_contact">Telephone Contact</label>
                    <Field name="pt_contact" type="text" className="form-control" />
                    <ErrorMessage
                      name="pt_contact"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pt_profession">Profession</label>
                    <Field name="pt_profession" as="select" className="form-control" >
                    <option value="" selected="true">Select </option>
                        <option value="DR">Doctor</option>
                        <option value="ENG">Engineer</option>
                        <option value="PES">Peasant</option>
                        <option value="STU">Student</option>
                    </Field>
                    <ErrorMessage
                      name="pt_profession"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                 

                  <div className="form-group">
                    <label htmlFor="pt_nationality">Nationality</label>
                    <Field name="pt_nationality" type="text" className="form-control" />
                    <ErrorMessage
                      name="pt_nationality"
                      component="div"
                      className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="pt_nin">NIN/Passport number</label>
                    <Field name="pt_nin" type="text" className="form-control" />
                    <ErrorMessage
                      name="pt_nin"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  </div>
                  </div>

                  <div className="form-group d-flex justify-content-around">
                    <button type="submit" className="btn btn-primary btn-block">
                        {loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                      <span>Register Patient</span>
                    </button>
                    <button type="reset" className="btn btn-danger btn-block" onClick={onClose}>Cancel Patient</button>
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
                  {message} : Patient Register successful
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default AddPatient;