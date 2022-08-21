import React,{useEffect,useState,useContext} from 'react'
import Link from "next/link";
import  axios from 'axios'
import { useRouter  } from "next/router";
import {UserContext} from "../context"
import Modal from "react-bootstrap/Modal";

const Header = () => {
  const router = useRouter();
  const [show,setShow] = useState(false);
  const[state,setState] = useContext(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[user,setUser] = useState([])

  useEffect( () =>{
    if(state&&state.token) getUser()
  },[state&&state.token])

    if(state !== null){
      var userName = `${state.user.username}`
      console.log(userName)
    }
   
  
    const getUser = async(e) => {
      try{
      
      const {data} = await axios.get("/find-user")
      console.log("data--->",data);
      if(data.error) {
        toast.error(data.error)
      }else{
        console.log("data--->",data)
        var priData = []
        for(var i=0; i<data.length; i++){
        if(data[i]._id !== state.user._id  ){
          priData.push(data[i])
        }
        setUser(priData)
      }
    }
    }catch(e){
      console.log("error modal",e)
    }
    }
    const logout = ()=>{
      window.localStorage.removeItem("auth");
      setState(null);
      router.push('/login');
    }

  return (
    <>{state !== null ?(<>
          <div className="top_header">
      <div className="Desktopflex_Mobileblock AlignItem_center">
      </div>

      <div className="DisplayFlex AlignItem_center">
      <div>
         <p>{userName}</p>
        </div>
        <div>
     
            <img className="ml_8" src="/images/user_profile.svg" onClick={handleShow} />
          
        </div>
      </div>
    </div>
    <div className="mr_top">
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <h4 className="heading24_bold"> Active user</h4>
            </Modal.Header>
            <div className="modelScroll">
              <Modal.Body>

             <div className="font_style"> Other Active user (for testing purpose, clicking on will redirect to login page) </div>
             {
                user.map((d)=>{
            return(
              <>
              <div className="mr_top" key={d._id} onClick={logout}>
                <p>username:{d.username}</p>
                <p>password:{d.dubpassword}</p>
                </div>
              </>
            )})}

              </Modal.Body>
            </div>
            <Modal.Footer>
              <button
                onClick={handleClose}
                className="lightGrayborder_btn mr_12"
              >
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
          </>
          </div>
    </>):(<></>)}</>

  );
}

export default Header
