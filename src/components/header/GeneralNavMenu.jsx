import React from 'react'

const GeneralNavMenu = () => {
  return (
    <div className='col-lg'>
                
                  <div className='d-flex justify-content-center'>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link active p-2"  style={{backgroundColor: "#C9B"}} href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link p-2" href="#">About Us</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link p-2" href="#">Features</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link p-2" href="#">Contact Us</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link p-2" href="#">Learning Center</a>
                    </li>
                  </ul>
                  </div>
    </div>
  )
}

export default GeneralNavMenu