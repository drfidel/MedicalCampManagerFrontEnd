//Authentication center

import axios from "axios";
import Cookies from 'universal-cookie';

import { API_URL } from "./api";

const cookies = new Cookies();

const login = (username, password) => {
    return axios
    .post(API_URL + "mob/auth/login/", {
        username,
        password,
    })
    .then((response) => {
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            cookies.set("access", JSON.stringify(response.data.access), { path: '/'});
            cookies.set("user", JSON.stringify(response.data.user), { path: '/'});
        }
        //console.log(response.data)
        return response.data.user
    });
};

const logout = () => {
    return axios
    .post(API_URL + "mob/auth/logout/",{})
    .then((response) => {
        if (response.data) {
            localStorage.removeItem("user");
            cookies.remove("access", { path: '/' });
            cookies.remove("user", { path: '/' });
        }
        return response.data
    })
    //TODO add catch and finally to catch bugs
}

const getCurrentUser = () => {
    // return JSON.parse(localStorage.getItem("user"))
    return JSON.parse(cookies.get('user',{ doNotParse: 'true' }));
}

const authService = {
    login,
    logout,
    getCurrentUser
};

export default authService;