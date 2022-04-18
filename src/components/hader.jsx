import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image1 from "../styles/images/a tryst with magic.png"
import { Modal, ModalBody } from "reactstrap";
import authAction from "../actions/auth.action";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agent from "../actions/super";

const Header = () => {
  let location = useLocation();

  const [login,setLogin]=useState(false);
  const [sign,setsign]=useState(false);
  const [password,setPassword]=useState("");
  const [password1,setPassword1]=useState("");

  const [number, setNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [name,setname]=useState("");
  const [email,setEmail]=useState("");
  const [email1,setEmail1]=useState("");
  const [token,setToken]=useState("");
  const cookies = new Cookies();
  useEffect(()=>{
    fetch()
    let token=Agent.getToken()?Agent.getToken():"";
    console.log(token);
    setToken(token);

  },[])
  const fetch=()=>{

    authAction.getuser((err,res)=>{
      if(err){

      }else{
        console.log(res,"here is respose")
      }
    })
  }
  const log =()=>{
    if(!email&&!password){
      toast.warning("ENTER email password")
      return 
    }
    let dataToSend={
      email:email,
      password:password
    }
    authAction.Login(dataToSend,(err,res)=>{
      console.log(err,res,"jcjndc")
    
          if(res.statusCode==400){
          toast.warning("user is not found")
          return
        }
        let user=res.data;
        toast("user login successfully")
        console.log("here is responsse",res)
        cookies.set('token',user.token, { path: '/' });
        setLogin(false);
        setsign(false);
      
    })
  }
  const Sign =()=>{
    if(!email&&!password1&&!name){
      toast.warning("fill name,email,password",)
      return
    }
    let dataToSend={
      email:email1,
      password:password1,
      rollNo:number,
      collegeName:collegeName,
      name:name,

    }
    console.log(dataToSend,"njnjdnjcdn")
    authAction.Signup(dataToSend,(err,res)=>{
      if(err){

      }else{
        let user=res.data;
        console.log("here is responsse",res)
        cookies.set('token',user.token, { path: '/' });
        toast("signup successfully")
        setLogin(false);
        setsign(false);
        window.location.reload();
              }
    })
  }
  const google = () => {
    // let timer: NodeJS.Timeout | null = null;
    cookies.set('token',"dkcjbkbcwkdjbcjsdbclvsdljhcvlsdvcvsdhjlcvlsdvchvsdlhjcvlsjdhvcjhlsdvcljhvsdhjcvlshdvcljhsdv", { path: '/' });
    const googleLoginURL = "https://nitkkr.herokuapp.com/auth/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

 };
 const facebook = () => {
   window.open("https://nitkkr.herokuapp.com/auth/facebook", "_self");
 };

  return (
    <>
     <header>
         <div class="navigation">
           
            <nav class="navbar navbar-expand-lg navbar-light">
               <div class="container">
                  <a class="navbar-brand" href="index.html"><img class="logo-img" src={image1} alt=""/></a>
                  {token==""?<a class="login-out-nav-btn" onClick={e=>{
                     setLogin(true);
                  }}>Log in / Sign Up</a>:""}
                  <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="navbar-collapse collapse" id="navbarNav">
                     <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                        <Link
                    className={`nav-link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                        </li>
                        <li class="nav-item">
                        <Link
                    className={`nav-link ${
                      location.pathname === "/AboutUs" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/AboutUs"
                  >
                    AboutUs
                  </Link>
                        </li>
                        <li class="nav-item">
                        <Link className={`nav-link ${ location.pathname === "/Sponsors" ? "active" : ""  }`}aria-current="page" to="/Sponsors"
                                  >
                             Sponsors
                            </Link>
                        </li>
                        <li class="nav-item">
                        <Link className={`nav-link ${ location.pathname === "/Events" ? "active" : ""  }`}aria-current="page" to="/Events"
                                  >
                             Events
                            </Link>
                        </li>
                        <li class="nav-item">
                        <Link className={`nav-link ${ location.pathname === "/Team" ? "active" : ""  }`}aria-current="page" to="/Team"
                                  >
                             Team
                            </Link>
                        </li>
                        <li class="nav-item">
                        <Link className={`nav-link ${ location.pathname === "/Developers" ? "active" : ""  }`} to="/Developers"
                                  >
                             Developers
                            </Link>
                        </li>
                        <li class="nav-item">
                        <Link className={`nav-link ${ location.pathname === "/categories" ? "active" : ""  }`} to="/categories"
                                  >
                             Categories
                            </Link>
                        </li>
                        <li class="nav-item">
                        {token==""?<a class="nav-link login-nav-btn" data-bs-toggle="modal" data-bs-target="#getstartedmodal" onClick={e=>{
                              setLogin(true);
                           }}>Log in / Sign Up</a>:""}
                        </li>
                     </ul>
                  </div>
               </div>
            </nav>
         </div>
      </header>
      <Modal
      isOpen={login}
      toggle={() => {
        setLogin(false);
        setsign(false);
      }}
      className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
    ><ToastContainer />
      <div className="auth-modal-wrp">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div className="auth-modal-artwork">
              <img
                src=""
                className="img img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="auth-modal-content">
              <div className="w-100">
                <div className="auth-modal-logo">
                  <img
                    src={image1}
                    className="img img-fluid"
                    alt=""
                  />
                </div>
                <h2>Please Sign in to Confluence</h2>
                <div className="auth-input-wrp">
                  <label for="">Enter Email</label>
                  <input
                    type="text"
                    name="Email"
                    onChange={e=>{
                      e.preventDefault();
                      console.log(e.target.value)
                      setEmail(e.target.value);
                    }}
                    value={email}
                    className="form-control"
                    placeholder=""
                  />
                    <label for="">Enter password</label>
                  <input
                    type="password"
                    name="mobileNo"
                    // onChange={}
                    className="form-control"
                    placeholder=""
                    onChange={e=>{
                      e.preventDefault();
                      console.log(e.target.value)
                      setPassword(e.target.value);
                    }}
                  />
                  <button
                    role="button"
                    data-bs-target="#verifyOTPmodal"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    className="btn auth-main-btn"
                    type="button"
                    onClick={() => {
                      log();
                    }}
                  >
                    Login
                  </button>
                </div>
                <p>Or Sign in with</p>
                <ul>
                  <li className="pe-2">
                    <button className="btn" onClick={e => {
                    e.preventDefault();
                    console.log(e.target.value)
                    google()
                    }}>
                      {" "}
                      <img
                        src="./assets/img/login-with-google.png"
                        className="img img-fluid"
                        alt=""
                      />
                      Log in with Gmail
                    </button>
                  </li>
                  {/* <li className="ps-2">
                    <button className="btn" onClick={e => {
                      e.preventDefault();
                      
                    }}>
                      {" "}
                      <img
                        src="./assets/img/login-with-facebook.png"
                        className="img img-fluid"
                        alt=""
                      />
                      Log in with Facebook
                    </button>
                  </li> */}
                </ul>
                <h5>
                  Don’t have account ?{" "}
                  <a
                    role="button"
                    data-bs-target="#createAccmodal"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                       e.preventDefault();
                     setsign(true)
                     setLogin(false);
                    }}
                  >
                    Create now
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div></Modal>
      <Modal
      isOpen={sign}
      toggle={() => {
        setsign(false)
        setLogin(false);
      }}
      className="authentication-modal modal-dialog modal-dialog-centered modal-xl"
    >
      <div className="auth-modal-wrp">
        <div className="row">
        <div className="col-lg-6 p-0">
            <div className="auth-modal-artwork">
              <img 
                 src=""
                 className="img img-fluid"
                alt=""
              />
            </div>
          </div>
        <div className="col-lg-6 p-0">
                <div className="auth-modal-content">
                  <div className="w-100">
                    <div className="auth-profile-pic-wrp">
                    <div className="profile-pic-chooose">
                                  
                                    <img
                                      src={image1}
                                      className="img img-fluid"
                                      alt=""
                                    />
                                    </div>
                    </div>
                    <div className="auth-input-wrp">
                      <div className="row">
                        <div className="col-lg-6">
                          <label for="">Name</label>
                          <input
                            type="text"
                            onChange={e=>{
                              setname(e.target.value);
                              console.log(e.target.value)
                            }}
                            className="form-control"
                            name="firstName"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-6">
                          <label for="">College Name</label>
                          <input
                            type="text"
                            onChange={e=>{
                              setCollegeName(e.target.value);
                              console.log(e.target.value)
                            }}
                            className="form-control"
                            name="lastName"
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-12">
                          <label for="">Email ID</label>
                          <input
                            type="email"
                            className="form-control"
                            // onChange={onChangeUser}
                            name="email"
                            placeholder=""
                            onChange={e=>{
                              e.preventDefault();
                              setEmail1(e.target.value);
                            }}
                            value={email1}
                          />
                        </div>
                        <div className="col-lg-12">
                          <label for="">Roll No.</label>
                          <input
                            type="text"
                            className="form-control"
                            name="mobileNo"
                            onChange={e=>{
                              e.preventDefault();
                              setNumber(e.target.value);
                            }}
                            value={number}
                            placeholder=""
                          />
                        </div>
                        <div className="col-lg-12">
                          <label for="">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={e=>{
                              e.preventDefault();
                              setPassword1(e.target.value);
                            }}
                            value={password1}
                            placeholder="password"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn auth-main-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          Sign()
                        }}
                      >
                        Create Account
                      </button>
                    </div>
                    <h5>
                      By signing up , you agree to{" "}
                      <a href="javascript:;">terms and condition</a>{" "}
                      and Borhan <a href="javascript:;">policy</a>
                    </h5>
                  </div>
                </div>
              </div>
       
        </div>
      </div>
      <ToastContainer />
      </Modal>

      
    </>
  );
};

export default Header;
