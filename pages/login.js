import React,{useState,useContext} from 'react'
import  axios from 'axios'
import {toast} from "react-toastify";
import { useRouter } from "next/router";
import {UserContext} from '../context';

const Login = () => {
  const router = useRouter();
  const  [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const[state,setState] = useContext(UserContext);


  const handleSubmit= async (e)=>{
    try{
      e.preventDefault();
      console.log("event passed--->",e, username, password);
      const res = await axios.post("http://localhost:8000/api/login",{username,password})
      console.log("data--->",res);
      if(res.data.error) {
        toast.error(res.data.error)
      }else{
        toast.success("Login success!");
        setState({
          user: res.data.user,
          token:res.data.token,
      })
      //save in local storage
      window.localStorage.setItem('auth',JSON.stringify(res.data));
      //redirect to home
        router.push('/dashboard')
      }         
    }catch(e){
      console.log("login-->",e);
    }
  }
  return (
    <div className="fullFrame">
      <div className="leftsidecontent">
        <img src="/images/login_bg.png" />
      </div>
      <div className="rightsidecontent">
        <div className="center_align">
          <div>
            <div className="logo_section">
              <img src="/images/logo.png" />
            </div>
            <div className="accountFrame">
              <div className="account_sec">
                <h3 className="heading18SemiBold mb_16">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb_12">
                    <input
                      type="text"
                      className="input_form width_100per"
                      placeholder="Registered Useremail"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />
                    <small>Eg:yourusername@mymail.abz</small>
                  </div>
                  <div className="mb_16">
                    <input
                      type="password"
                      className="input_form width_100per"
                      placeholder="Password"
                      value= {password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>

                  <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                    <div>
                      <button className="darkGray_btn" disabled={!username||!password}>Log in</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
