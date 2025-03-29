import axios, { Axios, AxiosError, HttpStatusCode, isAxiosError } from "axios";
import { API_URL } from "./api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const getSingleInventoryInfo = (id) => {
    return axios.get(API_URL + `stock/inventory/${id}`, {
        headers : {'Authorization': 'Bearer ' + cookies.get('access')} 
    })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        if (error.response) {

            // The server responded with a status code outside the 2xx range
            //console.log('Error response:', error.response);
            return error.response
    
      
          } else if (error.request) {
      
            // The request was made but no response was received
            return error.request
      
            //console.log('Error request:', error.request.responseURL);
      
          } else {
      
            // Something happened in setting up the request that triggered an error
      
            console.log('Error message:', error.message);
      
          }
    });

};

const getAllInventories = (pgno) => {

    return axios
    .get(API_URL + `stock/inventory?page=${pgno}`, { headers : {'Authorization': 'Bearer ' + cookies.get('access')} })
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        //console.log(error.response)
        if (error.response) {

            // The server responded with a status code outside the 2xx range
            //console.log('Error response:', error.response);
            return error.response
    
      
          } else if (error.request) {
      
            // The request was made but no response was received
            return error.request
      
            //console.log('Error request:', error.request.responseURL);
      
          } else {
      
            // Something happened in setting up the request that triggered an error
      
            console.log('Error message:', error.message);
      
          }
    });

};

const addNewInventory = ( fields ) => {
    return axios
    .post(API_URL + "stock/inventory", { ...fields }, {headers : {'Authorization': 'Bearer ' + cookies.get('access')} })
    .then((response)=> {
      return response;
    }).catch((error) => {
      return error.response;
    });
  }
  
  const editInventory = ( fields ) => {
    return axios
    .put(API_URL + `stock/inventory/${fields.id}`, { ...fields}, {headers : {'Authorization': 'Bearer ' + cookies.get('access')} })
    .then((response)=> {
      return response;
    }).catch((error) => {
      return error.response
    });
  }

  const inventoryService = {
    getSingleInventoryInfo,
    getAllInventories,
    addNewInventory,
    editInventory
};

export default inventoryService;