import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { PiEyeClosedBold } from "react-icons/pi";
import { PhoneInput } from "react-contact-number-input";
import axios from "axios";
import backgroundImage from "../images/aicte-building.jpg"
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  const load = () => {
    return (
      <div
        className={`flex justify-center items-center h-screen fixed top-0 left-0 w-full ${
          loading ? "block" : "hidden"
        } bg-gray-800 bg-opacity-75`}
      >
        <div className="bg-white p-5 rounded-lg">
          <BeatLoader loading={loading} className="text-cyan-900 text-3xl" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  };

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const [confirmopen, setConfirmopen] = useState(false);

  const confirmtoggle = () => {
    setConfirmopen(!confirmopen);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phoneNumber) => {
    setData({ ...data, phone: phoneNumber });
  };

  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.firstname || !data.lastname || !data.email || !data.phone || !data.password || !confirmpassword) {
      toast.error("Fill all details Properly");
      return;
    }

    setLoading(true);

    if (data.password !== confirmpassword) {
      toast.error("Both passwords should be the same");
      setLoading(false);
    } else {
      // Extract the phoneNumber from the phone object
      const phoneNumber = data.phone.phoneNumber;

      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/register",
          { ...data, phone: phoneNumber },
          {
            headers: {
              'Content-type': 'application/json',
            },
          }
        );

        toast.success(response.data.message);

        if (response.status === 200) {
          toast.success("Redirecting to login");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    
    <div className="bg-cover bg-center h-screen"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      {loading ? (
        load()
      ) : (
        <div>
          <Navbar />
          <div className="flex justify-center items-center h-screen">
            <div className="w-1/3 px-9 py-6 shadow-lg shadow-gray-700 bg-gray-200">
              <div className="flex flex-col items-center text-right">
                <p className="text-lg text-secondary font-semibold">Please SignUp to your account and start</p>
              </div>
              <form>
                <div className="flex-col mt-7 space-y-3 ml-6 lg:h-3/4">
                  <div class="flex space-x-2">
                    <div className="flex-1">
                      <label className=" font-semibold">First Name</label>
                      <input type="text" className="border p-2 rounded w-40" name="firstname" value={data.firstname} id="firstname" onChange={handleChange} />
                    </div>
                    <div className="text-left flex-1">
                      <label className=" font-semibold">Last Name</label>
                      <input type="text" className="border p-2 rounded w-44" name="lastname" id="lastname" value={data.lastname} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="text-left flex-1">
                    <label className="font-semibold">Email</label>
                    <div className="lg:flex">
                      <input type="email" className="lg:w-96 border p-2 rounded" name="email" id="email" value={data.email} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="phone-input-container">
                    <label className="text-left font-semibold">Phone</label>
                    <PhoneInput
                      value={data.phone}
                      id="phone"
                      name="phone"
                      countryCode="us"
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <div className="lg:flex lg:flex-col lg:mb-2 relative">
                    <label className="text-left font-semibold">Password</label>
                    <div className="lg:flex">
                      <input type={(open===false)?'password':'text'} className="lg:w-full border p-2 rounded" name="password" id="password" value={data.password} onChange={handleChange} />
                    </div>
                    <div className="text-2xl bottom-2 right-3 absolute">
                      {
                        (open===false)?<FaEye onClick={toggle}/>:<PiEyeClosedBold onClick={toggle}/>
                      }
                    </div>
                    <span className="text-danger"></span>
                  </div>
                  <div className="lg:flex lg:flex-col lg:mb-2 relative ">
                    <label className="text-left font-semibold" >Confirm Password</label>
                    <div className="lg:flex">
                      <input type={(confirmopen===false)?'password':'text'} className="lg:w-full border p-2 rounded" name="confirmpassword" id="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="text-2xl absolute bottom-2 right-3 ">
                      {
                        (confirmopen===false)?<FaEye onClick={confirmtoggle}/>:<PiEyeClosedBold onClick={confirmtoggle}/>
                      }
                    </div>
                  </div>
                  <div className="lg:flex lg:flex-col">
                    <div className="lg:mb-2 mt-4">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-96" onClick={handleSubmit}>SignUp</button>
                    </div>
                    <div className=" items-center">
                      <div className="lg:mb-0 flex">
                        <span className="mr-2 font-semibold" >Do you have an Account?</span>
                        <span
                            className="cursor-pointer font-semibold text-sky-800"
                            onClick={() => navigate("/login")} // Use navigate to redirect to the Login component
                        >
                            Login Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
