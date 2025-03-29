import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getinventories } from '../../../redux/_slices/inventory';
import useInventory from '../../../utils/hooks/useInventory';
import Error403 from '../../common/403Error';

const InventoryList = () => {

  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setsearchTerm] = useState("");
  const [listerror, setError] = useState([]);
  const dispatch = useDispatch();

  //adding pagination support
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState([]);

  //fetch encounters by page
  const { inventories, pgCount, page, nextpage, previouspage, error } = useInventory()


  const handleOnChange = (e) => {
      e.preventDefault();
      setsearchTerm(e.target.value)
  }

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  //check if null then load patients
  useEffect(() => {

    //base fetch
    dispatch(getinventories(currentPage))
    .unwrap()
    .then((response) => {
          if (response){setReload(response.inventory)}
          else{setError(response)} 
    })
    .catch((error) => setError(error))

    const refetch = () => {
      if(nextpage){
        dispatch(getinventories(currentPage))
        .unwrap()
        .then((response) => {
          if (response){setReload(response.inventories)}
          else{setError(response)} 
        })
        .catch((error) => setError(error))
      }

      if(previouspage){
        dispatch(getinventories(currentPage))
        .unwrap()
        .then((response) => {
          if (response){setReload(response.encounters)}
          else{setError(response)}
        })
        .catch((error) => setError(error))
      }
      
    }
  
    refetch()
    
  }, [currentPage])


  if(error){
    return <Error403 errorstatus={error.status} statusText={error.statusText}/>
  }

  if(!reload){
    return <Error403 errorstatus={listerror.status} statusText={listerror.statusText}/>
  }

return (
  <div className="container">

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
        totalCount={pgCount}
        pageSize={inventories.length}
        onPageChange={onPageChange}
      />
    </div>

    <table className="table table-striped table-hover table-light">
      <thead>
        <tr>
          <th className="table-data"> Item ID </th>
          <th className="table-data"> ExpDate </th>
          <th className="table-data"> Product Name </th>
          <th className="table-data"> Qty - instock </th>
          <th className="table-data"> Price </th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
        {reload.map((inventory, key) =>
          <tr key={key}>
           <td className="table-data"> {inventory.id} </td>
            <td className="table-data"> {moment(inventory.visit_date).format('DD-MM-YYYY')}</td>
            <td className="table-data"> {inventory.title} </td>
            <td className="table-data"> {inventory.availableqty} </td>
            <td className="table-data"> {inventory.price} </td>
            
            <td className="table-data"> 
              <div className="d-flex justify-content-center">
              <Link href={`/inventory/detail/${inventory.id}`} className="btn btn-primary btn-sm m-1">Inventory Detail</Link>
              <button type="button" class="btn btn-success btn-sm m-1">Add Batch</button>
              </div>
             </td>
          </tr>
        )}</tbody>
    </table>

    <div className="d-flex flex-row-reverse">
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={pgCount}
        pageSize={inventories.length}
        onPageChange={onPageChange}
      />
    </div>
  </div>
)
}

export default InventoryList