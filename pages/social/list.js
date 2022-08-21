import React,{useState,useContext, useEffect} from 'react'
import  { UserContext } from '../../context';
import  axios from 'axios'
import Cusmodal from "../../components/model";
import MailTable from '../../components/table';
import UserRoute from '../../routes/userRoute'






const Social = () => {
  var title = "Send Social mail"
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
      console.log("data prim--->",data)
      var priData = []
      for(var i=0; i<data.length; i++){
      if(data[i].sentTo === state.user._id && data[i].category === 'Social' ){
        priData.push(data[i])
      }
    }
      setSdata(priData)
      console.log("fdfadfa",priData)
      console.log("data prim----->",sdata)
    }


  return (
    <UserRoute>
    <div>
      <div className="page_info">
        <div>
          <h3 className="heading24_bold">Social Mail</h3>
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

export default Social