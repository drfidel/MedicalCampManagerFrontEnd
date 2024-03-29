import React from 'react'
import Image from 'next/image'
import GeneralNavMenu from './GeneralNavMenu';
import AuthNavMenu from './AuthNavMenu';
import { ApplicationName } from '../common/Constants'
import { Provider } from 'react-redux';
import store from '../../redux/store/store';

const NavigationBar = () => {
  return (
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark" style={{backgroundColor: "#A9B"}}>

          <div className="d-sm-flex container-sm">
              <a className="navbar-brand" href="/">{ApplicationName}</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavbar">

                <GeneralNavMenu/>
                <Provider store={store}>
                  <AuthNavMenu/>
                </Provider>
                

              </div>
          </div>   
        </nav>
  )
}

export default NavigationBar;