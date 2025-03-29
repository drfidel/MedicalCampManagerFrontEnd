import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';

const DispenseTable = ({dispense_rx, handleDelete}) => {


  return (
    <table className="table table-striped table-hover table-light m-2">
        <thead>
            <tr>
                <th className="table-data"> id </th>
                <th className="table-data"> Route </th>
                <th className="table-data"> Drug Name </th>
                <th className="table-data"> Dosing </th>
                <th className="table-data"> mg </th>
                <th className="table-data"> Freq </th>
                <th className="table-data"> Days </th>
                <th className="table-data"> Total count </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody>
               {dispense_rx.map((rx,index) => 
                <tr key={rx}>
                   <td className="table-data"> {rx.id} </td>
                   <td className="table-data"> {rx.pres.route} </td>
                   <td className="table-data"> {rx.pres.drugname} </td>
                   <td className="table-data"> {rx.pres.dosing}</td>
                   <td className="table-data"> {rx.pres.units} </td>
                   <td className="table-data"> {rx.pres.freq} </td>
                   <td className="table-data"> {rx.pres.duration} </td>
                   <td className="table-data"> {rx.pres.duration} </td>
                           
                   <td className="table-data"> 
                       <div className="d-flex justify-content-center">
                           <button className="btn btn-primary btn-sm m-1" type="button" onClick={() => handleDelete(rx.id)}>Delete</button>
                           <Link href={`/dispense/${1}`} className="btn btn-secondary btn-sm m-1">Update </Link>
                       </div>
                   </td>
               </tr>
               )}     
        </tbody>
    </table>
  )
}

DispenseTable.propTypes = {}

export default DispenseTable