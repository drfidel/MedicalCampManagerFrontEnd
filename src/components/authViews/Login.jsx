import { Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { ApplicationName } from '../common/Constants'
import { Formik, ErrorMessage,Form } from 'formik'
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/_slices/auth';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router'
import { clearMessage } from '../../redux/_slices/message';

const Login = () => {

  //Working state
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const router = useRouter()

  //clearloginstate
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  //initial formvalues, blank strings
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  //Login handler
  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    
    setLoading(true);

    dispatch(login({ username, password }))
    .unwrap()
    .then((response) => {
      //If login success, open the users dashboard
      //props.history.push("/dashboard")
      router.push('/dashboard')
      window.location.reload();
    })
    .catch((e) => {
      setLoading(false);
    });
  };

  if(isLoggedIn) {
    //return redirect('/dashboard')
    window.location.reload();
    router.push('/dashboard')
  }

  return (
    <section className="vh-auto" style={{backgroundColor: "#9A616D"}}>
      <div className="container py-2 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form" className="img-fluid"/>
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}>
                    <Form>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                        <span className="h1 fw-bold mb-0">{ApplicationName}</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>

                      <div className="form-outline mb-4">
                        <Field type="text" name="username" id="username" className="form-control form-control-lg" />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="alert alert-danger"
                        />
                        <label className="form-label" htmlFor="username">Username</label>
                      </div>

                      <div className="form-outline mb-4">
                        <Field type="password" name="password" htmlFor="password"className="form-control form-control-lg" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>

                      <div className="form-check">
                        <Field className="form-check-input" type="checkbox" name="rememberme" value="" id="rememberme" checked="checked" />
                        <label className="form-check-label" htmlFor="rememberme"> Remember me </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={loading}>
                        {loading && 
                          (<span className="spinner-border spinner-border-sm"></span>)}
                          <span>Login</span>
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">Forgot password ?</a>
                      <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}> Don't have an account? <span/>
                      <a href="/signup" style={{color: "#393f81"}}> Register here </a> </p>
                      <div className='d-flex justify-content-center'>
                        <a href="/termsofuse" className="small text-muted">Terms of use. </a> <span/>
                        <a href="/privacypolicy" className="small text-muted">Privacy policy</a>
                      </div>
                    </Form>
                    </Formik>

                  </div>

                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  )
}

export default Login