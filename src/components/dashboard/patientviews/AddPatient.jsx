import React from 'react'
import  Modal  from 'react-bootstrap/Modal';
import  Button  from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

const AddPatient = (props) => {
    const { show, onClose } = props;

  return (
    <>
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onClose}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sir Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Smith"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="56 years"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gender</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={onClose}>
            Save Patient
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddPatient;