import React,{useState,useContext,useEffect} from 'react'
import Cusmodal from "../components/model";
import MailTable from '../components/table';
import UserRoute from '../routes/userRoute' 
import axios from "axios";
import  { UserContext } from '../context';


const Dashboard = () => {

    var title = "Send Mail"
    const[state,setState] = useContext(UserContext)
    const[sdata,setSdata]= useState([])
    useEffect(()=>{
      if(state && state.token)  {
        allMail()
      }
    },[state && state.token])

  const allMail = async()=>{
    const userid = state.user._id
    console.log("user id--->",userid)
    const {data} = await axios.get(`/get-allmail/${userid}`)
    console.log("data dash--->",data)
    for(var i=0;i<data.length;i++){
    if(data[i].sentTo === state.user._id  ){
      console.log(data[i])
      setSdata(data)
    }
  }
    console.log("data dash----->",sdata)
  }
  return (
    <UserRoute>
    <div>
      <div className="page_info">
        <div>
          <h3 className="heading24_bold">All Mail</h3>
        </div>
        <div>
        <Cusmodal title={title} />
        </div>
      </div>
        <MailTable data={sdata}/>
    </div>
    </UserRoute>
  );
}

export default Dashboard
