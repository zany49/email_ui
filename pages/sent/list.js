import React,{useState,useContext, useEffect} from 'react'
import  { UserContext } from '../../context';
import  axios from 'axios'
import Cusmodal from "../../components/model";
import MailTable from '../../components/table';
import UserRoute from '../../routes/userRoute'







const Sent = () => {

  var title = "Send Mail"
  const[state,setState] = useContext(UserContext)
  const[sdata,setSdata]= useState([])
  useEffect(()=>{
    if(state && state.token)  {
  sentMail()
    }
  },[state && state.token])

  const sentMail = async()=>{
    const userid = state.user._id
    console.log("user id--->",userid)
    const {data} = await axios.get(`/get-sentmail/${userid}`)
    console.log("data--->",data)
    for(var i=0;i<data.length;i++){
    if(data[i].mailSent ===true && data[i].sentBy === state.user._id  ){
      setSdata(data)
    }
  }
    console.log("data----->",sdata)
  }
  return (
    <UserRoute>
    <div>
      <div className="page_info">
        <div>
          <h3 className="heading24_bold">Sent Mail</h3>
        </div>
        <div>
        <Cusmodal title={title} />
        </div>
      </div>
        <MailTable data={sdata} /> 
       
    </div>
    </UserRoute>
  );
}

export default Sent
