import axios from "axios";
import { API_URL } from "./api";

const getSinglePatientInfo = (id) => {
    return axios.get(API_URL + `data/patient/${id}`, {
         id,
         withCredentials : true })
     
};

const getAllPatientsInfo = () => {
    return axios
    .get(API_URL + "data/patient", { withCredentials : true })
    .then((response) => {
        return response.data
    })
};

const patientService = {
    getSinglePatientInfo,
    getAllPatientsInfo,
};

export default patientService