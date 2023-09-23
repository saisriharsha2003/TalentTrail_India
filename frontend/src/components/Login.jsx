import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";
import backgroundImage from "../images/aicte-building.jpg"


const Login = () => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [open,setOpen] = useState(false);
  // spinner
  const load = () => {
    return (
      <div className={`flex justify-center items-center h-screen ${loading ? 'block' : 'hidden'}`}>
        <div className="bg-white p-5 rounded-lg">
          <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  //handling toggle
  const toggle = () =>{
    setOpen(!open)
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email ||!password){
      toast.error("Fill all details");
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    try {
      const response = await axios.post("http://localhost:8000/api/user/login", formData, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      console.log(response);
      if (response.status === 400) toast.error("Fill all details");
      else if (response.status === 200) {
        const { message, firstname } = response.data;
        toast.success(`${message}. Welcome, ${firstname}!`);
        localStorage.setItem("firstname", response.data.firstname)
        localStorage.setItem ("token", response.data.accessToken);
        setTimeout(() => {
          navigate("/home");
        }, 1000)
      }
      else if (response.status === 401) toast.error("Invalid Credentials");
      else if (response.status === 404){
        toast.error("User Not Found");
        
      } 
      if (response.status === 500) toast.error("Internal Server Error");
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    finally{
      setLoading(false);
      // setpassword("");
    }

  };
  return (
     <div  className="bg-cover bg-center h-screen"
     style={{ backgroundImage: `url(${backgroundImage})` }}>{loading?load():(
        <div>
             <Navbar />
          <div className="lg:w-full flex flex-col items-center">
            <form>
              <div className="lg:flex lg:h-screen">
                <div className="lg:m-auto shadow-lg shadow-gray-700 px-14 py-10 bg-gray-200">
                  <div className=" flex flex-col items-center text-right">
                    <p className="text-lg  font-semibold">Please Sign-In to your account and start</p> <br />
                  </div>
                  <div className="lg:flex lg:flex-col login-form">
                    <div className="lg:flex lg:flex-col lg:mb-2">
                      <label className="text-left  font-semibold">Email</label>
                      <div className="lg:flex">
                        <input type="email" value={email} className="lg:w-full border p-2 rounded" onChange={(event) => setemail(event.target.value)} />
                      </div>
                      <span className="text-danger"></span>
                    </div>
                    <div className="lg:flex lg:flex-col lg:mb-2 relative">
                      <label className="text-left font-semibold">Password</label>
                      <div className="lg:flex">
                        <input type={open ? "text" : "password"} value={password} className="lg:w-full border p-2 rounded" onChange={(event) => setpassword(event.target.value)} />
                      </div>
                      <div className="text-2xl absolute bottom-2 right-3 ">
                              {
                                open?(<FaEyeSlash onClick={toggle} className="text-gray-400"/>):(<FaEye onClick={toggle} className="gray-600"/>)
                              }
                      </div>
                      <span className="text-danger"></span>
                    </div>
                    <p className="lg:mb-3 lg:flex lg:justify-end text-sky-800 font-semibold">
                      <Link to={"/forgetpassword"}>Forgot Password?</Link>
                    </p>
                    <div className="lg:flex lg:flex-col">
                      <div className="lg:mb-2">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" onClick={handleSubmit}>
                          <span>Login</span>
                        </button>
                      </div>
                      <div className="text-center lg:mb-0">
                        <span className="mr-2 font-semibold" >Don't have an Account?</span>
                        <Link className="font-semibold text-sky-800" to={"/register"}>SignUp</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

}
export default Login;