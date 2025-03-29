import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

let nextId = 0;

const PrescritionGen = ({sendDataToParent, initpres}) => {

    const [prescriptions, setPrescription] = useState(initpres)

    console.log(initpres)

    const handleMakePrescription = (e) =>   {
        // console.log(e.target.form[14].value +" "+ e.target.form[16].value +" "+ e.target.form[17].value +" "+ e.target.form[18].value +" X "+ e.target.form[19].value + 'days')
        let pres = e.target.form[13].value + e.target.form[14].value +" "+ e.target.form[16].value +" "+ e.target.form[17].value +" "+ e.target.form[18].value +" X "+ e.target.form[19].value
        let event = e.target.form[13].value
        
        //setPrescription(...prescriptions, {id: nextId++ , prespart: pres, event: event})
        setPrescription(initpres + pres)
        
        
        sendDataToParent(prescriptions)
    }

  return (
        <div className="card row mt-1">
            <label htmlFor="ptr">Drug Prescription generator</label>
            <div className='d-flex flex-row'>
            <div className='m-1 col-5'>
                    <Field name="pt_pr" id="pt_pr" className="form-control p-2" as="select">
                        <option value="" selected="true">Drug</option>
                        <option value="TAB AMOXICLAV">AMOXICLAV TAB</option>
                        <option value="TAB PANADOL">PANADOL TAB</option>
                        <option value="CA AMOXYL">AMOXYL CAP</option>
                    </Field>
                <button type='reset' onClick={handleMakePrescription} className="btn btn-primary btn-block m-1">Add Prescription</button>
            </div>
            <div className='m-1 col-2'>
            <Field name="pt_spr" id="pt_spr" type="text" className="form-control m-1 p-1">
                
            </Field>
            <Field name="pt_stpr" id="pt_stpr" className="form-control m-1" as="select">
                <option value="mg" selected="true">mg</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="dps">drps</option>
                <option value="dps">drps</option>
            </Field>
            </div>
            
            <Field name="pt_stspr" id="pt_stspr" className="form-control m-1 p-1" as="select">
                <option value="STAT" selected="true">STAT</option>
                <option value="OD">OD</option>
                <option value="BD">q12h</option>
                <option value="TDS">q8h</option>
                <option value="QID">q6h</option>
                <option value="q4h">q4h</option>
                <option value="EOD">EOD</option>
                <option value="BIW">BIW</option>
                <option value="TIW">BIW</option>
            </Field>
            <Field name="pt_stdspr" id="pt_stdspr" className="form-control mb-1 p-1" as="select">
                <option value="STAT" selected="true">STAT</option>
                <option value="3">3 d</option>
                <option value="5">5 d</option>
                <option value="7">7 d</option>
                <option value="7">10 d</option>
                <option value="7">7 d</option>
                <option value="10">10 d</option>
                <option value="14">14 d</option>
            </Field>

            </div>
    </div>
  )
}

export default PrescritionGen