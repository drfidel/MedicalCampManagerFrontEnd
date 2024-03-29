import React from 'react'
import FooterContacts from './FooterContacts'
import FooterLinks from './FooterLinks'
import FooterSocials from './FooterSocials'

const Footer = () => {
  return (
   
            
        <footer className="text-center text-lg-start text-muted" style={{backgroundColor: "#A9B"}}>
          
          <FooterSocials/>
         
          <section className="">
            <div className="container text-center text-md-start mt-5">
         
              <div className="row mt-3">
           
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3"></i>InnovaHealth
                  </h6>
                  <p>
                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                    dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>

                <FooterLinks/>

                <FooterContacts/>

              </div>

            </div>
          </section>

          <div className="text-center text-white p-4" style={{backgroundColor: "#A2B"}}>
            © 2024 Copyright:
            <a className="text-reset fw-bold" href="https://mdbootstrap.com/">medcampsys.com</a>
          </div>

        </footer>
  )
}

export default Footer