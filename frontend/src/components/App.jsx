import React from "react";
import { NotFound } from "./NotFound";
import Register from "./Register";
import HomePage from "./Home";
import Login from "./Login";
import { ForgetPassword } from "./ForgetPassword";
import { ResetPassword } from "./ResetPassword";
import {Route,Routes, useParams} from 'react-router-dom';
import ProtectedLayout from "./ProtectedLayout";
function App(){
    const {isUser_id,accessToken}=useParams();
    return(
        <div className="flex flex-col h-screen">
            
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                <Route path="/resetpassword/:isUser_id/:accessToken" element={<ResetPassword />}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}
export default App;


