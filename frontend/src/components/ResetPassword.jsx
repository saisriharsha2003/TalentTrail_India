
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";
// import LoginImage from "../Images/side-img.webp";
// import DarkLogo from "../Images/logo-blue-removebg-preview.webp";
// logo for project
import axios from 'axios';
import { useNavigate,Link,useParams} from "react-router-dom";
import { toast } from 'react-hot-toast';
import {IoChevronBack} from "react-icons/io5"
export const ResetPassword = () => {


  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const { isUser_id, accessToken } = useParams();
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
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password|| ! confirmpassword) {
      toast.error('Fill all details');
      return;
    }
    if (password!== confirmpassword) {
      toast.error('Both Password and Confirm Password should be same');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/resetpassword/${isUser_id}/${accessToken}`,
        { password }
      );

      if (response.status === 200) {
        toast.success('Password updated successfully');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else if (response.status === 400) {
        toast.error('Invalid request');
      } else if (response.status === 404) {
        toast.error('User not found');
      } else if (response.status === 500) {
        toast.error('Internal Server Error');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while resetting the password');
    } finally {
      setLoading(false);
      setPassword('');
    }
  };
  return (
     <div>{loading? load():(
    <div className="lg:flex bg-black h-screen bg-opacity-20" >
    <div className="flex justify items-center ml-96">
      <form className="flex justify items-center w-96 ml-52">
          <div className=" lg:m-auto shadow-lg shadow-gray-700 px-14 py-10 bg-gray-100 rounded-md">
            <div className=" flex flex-col items-center text-left">
              {/* <img src={DarkLogo} alt="Logo" width="300" className="mb-4" />
              <small className="text-red-800 font-bold lg:mb-2 lg:justify-end pl-10">NLP Powered Document Processer</small>
         */}
              <h1 className="text-2xl text-gray-600 font-semibold">Change Password</h1>
            </div>
            <div className="lg:flex lg:flex-col mt-4">
              <div className="lg:flex lg:flex-col lg:mb-2">
                <label className="text-left text-gray-500 font-semibold">New Password</label>            
                <input type="password" className="lg:w-full border p-2 rounded" onChange={(event) => setPassword(event.target.value)} />
                <label className="text-left text-gray-500 font-semibold">Confirm Password</label>            
                <input type="password" className="lg:w-full border p-2 rounded" onChange={(event) =>setconfirmPassword(event.target.value)} />
                
              </div>
              <div className="lg:flex lg:flex-col">
                <div className="lg:mb-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full" onClick={handleSubmit}>
                    <span>Update</span>
                  </button>
                  <div className="flex items-center mt-3 ml-14 text-cyan-900 hover:text-cyan-600 text-lg">
                    <IoChevronBack/>
                    <Link to={'/'}>Back to Login</Link>
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









