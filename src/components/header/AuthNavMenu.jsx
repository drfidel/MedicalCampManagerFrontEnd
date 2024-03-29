import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { logout } from '../../redux/_slices/auth';

const AuthNavMenu = () => {

  const { user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter()

  const logOut = useCallback(() => {  
    dispatch(logout());
    router.push('/')
  }, [dispatch]);
  


  return (
    <div className='d-flex justify-content-end'>

                  <ul className="d-flex navbar-nav">
                    { user ? (
                      
                    <ul className='navbar-nav'>
                      <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome {user.first_name}
                      </a>
                      <ul className="dropdown-menu bg-secondary" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item text-white" href="#">My Profile</a></li>
                        <li><a className="dropdown-item text-white" href="#">My Dashboard</a></li>
                        <li><a className="dropdown-item text-white" href="#">My Settings</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item text-danger" onClick={logOut}>Logout</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                          <a className="nav-link active p-2" style={{backgroundColor: "#C8C"}} onClick={logOut}>logout</a>
                    </li>
                    </ul>
                    
                    ):(
                      <ul className="navbar-nav">
                          <li className="nav-item">
                            <a className="nav-link active p-2" style={{backgroundColor: "#C8C"}} href="/">login</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link p-2" href="/signup">signup</a>
                          </li>
                      </ul>
                    )}
                  </ul>            
    </div>
  )
}

AuthNavMenu.propTypes = {}

export default AuthNavMenu