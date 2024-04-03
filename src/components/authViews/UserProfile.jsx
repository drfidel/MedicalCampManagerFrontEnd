import React from 'react'
import PropTypes from 'prop-types'

const UserProfile = props => {
  return (
    <section style={{backgroundColor: "#eee"}}>
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                  class="rounded-circle img-fluid" style={{width: '150px'}}/>
                <h5 class="my-3">Dr. John Smith</h5>
                <p class="text-muted mb-1">General Surgeon</p>
                <p class="text-muted mb-4">Surgery Department</p>
                <div class="d-flex justify-content-center mb-2">
                  <button type="button" class="btn btn-primary">View Port folio</button>
                  <button type="button" class="btn btn-outline-primary ms-1">View Dashboard</button>
                </div>
              </div>
            </div> 
          </div>

          <div class="col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Full Name</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Johnatan Smith</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">example@example.com</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Phone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">(097) 234-5678</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Mobile</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">(098) 765-4321</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Address</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>

        

        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">Last 5 Appointments</span> Patient service Status
                </p>
                <p class="mb-1" style={{fontSize: '.77rem'}}>Akampurira Bright 25/M</p>
                <div class="progress rounded" style={{height: '20px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>Kambuga Bill 15/M</p>
                <div class="progress rounded" style={{height: '20px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>Nankya Eunice 12/F</p>
                <div class="progress rounded" style={{height: '20px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>Acan Rose 35/F</p>
                <div class="progress rounded" style={{height: '20px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>Average waiting Time (Best 10mins)</p>
                <div class="progress rounded mb-2" style={{height: '25px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '66%'}} aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100">15min/20min</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">Overall Numbers</span> Performance
                </p>
                <p class="mb-1" style={{fontSize: '.77rem'}}>Outpatients Seen Today</p>
                <div class="progress rounded" style={{height: '15px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100">80/50</div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>In-patients Admitted Today</p>
                <div class="progress rounded" style={{height: '15px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100">75/150</div>
                </div>
                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>Number Referred Today</p>
                <div class="progress rounded" style={{height: '15px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '9%'}} aria-valuenow="15"
                    aria-valuemin="0" aria-valuemax="100">15/160</div>
                </div>

                <p class="mt-4 mb-1" style={{fontSize: '.77rem'}}>Total time logged Today</p>
                <div class="progress rounded" style={{height: '25px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: '75%'}} aria-valuenow="15"
                    aria-valuemin="0" aria-valuemax="100">360/480 mins</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

UserProfile.propTypes = {}

export default UserProfile