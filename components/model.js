import React, { useState,useEffect,useContext } from "react";
import  axios from 'axios'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import  { UserContext } from '../context';
import {toast} from "react-toastify";
import { useRouter } from "next/router";
 

const Cusmodal = ({title}) => {
  const router = useRouter();

  const[state,setState] = useContext(UserContext)
  const[to,setTo] = useState("")
  const[mtitle,setMTitle]= useState("")
  const[composeEmail,setComposeEmail] = useState("")
  const[category,setCategory] = useState("")

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);


  const handleShow = () => setShow(true);


  var userName;
    useEffect( () =>{
      if(state&&state.token) {
        if(title === "Send Social mail"){
          setCategory("Social")
          console.log(category)
        }
        if(title === "Send Promotion mail"){
          setCategory("Promotion")
          console.log(category)
        }
        if(title === "Send Primary mail"){
          setCategory("Primary")
          console.log(category)
        }
      }
    },[state&&state.token])

    if(state !== null){
      userName = `${state.user.username}`
     console.log(userName)
   }

  const handleSubmit = async(e) => {
    try{
  
          e.preventDefault();
    console.log('Submit-->',userName,to,mtitle,composeEmail,category)
    const res = await axios.post("/create-mail",{
      content:composeEmail,
      title:mtitle,
      sentBy:userName,
      sentTo:to,
      category:category
    })
    console.log("data--->",res);
    if(res.data.error) {
      toast.error(res.data.error)
    }else{
      console.log("data--->",res.data)
      toast.success("Mail success!");
      setTo('')
      setMTitle('')
      setComposeEmail('')
      setCategory('')
      handleClose()
    }
  }catch(e){
    console.log("error modal",e)
  }
    }

    const handleClear = () => {
      setTo('')
      setMTitle('')
      setComposeEmail('')
      setCategory('')
    }


  return (
    <>
      <button className="darkGray_btn" onClick={handleShow}>
        <img src="/images/add_icon.svg" className="mr_12" />
        {title}
      </button>
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <h4 className="heading24_bold">{title}</h4>
              <div className="DisplayFlex">
                <button className="lightGrayborder_btn mr_16" onClick={handleClear}>
                  Clear All Fields
                </button>
              </div>
            </Modal.Header>
            <div className="modelScroll">
              <Modal.Body>

              <div className="row mb_16">
                  <div className="col-md-3">
                    <label>User Details</label>
                  </div>
                  <div className="col-md-9">
                   { state !==null ?( <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">From</h5>
                      <input type="text" className="input_form width_100per" value={userName} disabled></input>
                    </div>):(<></>)}
                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">To</h5>
                      <input type="text" className="input_form width_100per"
                      value={to}
                      onChange={(e)=>setTo(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>

              <div className="row mb_16">
                  <div className="col-md-3">
                    <label>Content</label>
                  </div>
                  <div className="col-md-9">
                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">Title</h5>
                      <input type="text" className="input_form width_100per"
                      value={mtitle}
                      onChange={(e) =>setMTitle(e.target.value)}
                      ></input>
                    </div>

                    <div className="mb_16">
                      <h5 className="Text14SemiBold mb_4">
                        Compose Email
                      </h5>
                      <textarea className="textarea"
                      value={composeEmail}
                      onChange={(e) =>setComposeEmail(e.target.value)}
                      ></textarea>
                    </div>
                  { title === "Send Mail" ? (<>
                    <h5 className="Text14SemiBold mb_4">Category</h5>
                    <div className="select_dropdown_icon">
                        <div className="input-group-prepend">
                          <span className="inputGroup_text">
                            <img src="/images/input_tag_icon.svg" />
                          </span>
                        </div>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Primary">Primary</option>
                        <option value="Promotion">Promotion</option>
                        <option value="Social">Social</option>
                      </select>
                      </div>
                  </>):(<></>) }
                  </div>
                </div>

              </Modal.Body>
            </div>
            <Modal.Footer>
              <button
                onClick={handleClose}
                className="lightGrayborder_btn mr_12"
              >
                Cancel
              </button>
              <button className="SmalldarkGray_btn" onClick={handleSubmit}>Submit </button>
            </Modal.Footer>
          </Modal>
          
        </>
    </>
  );
  }

  export default Cusmodal;

