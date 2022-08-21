import React,{useState,useContext, useEffect} from 'react'
import  { UserContext } from '../../context';
import  axios from 'axios'
import UserRoute from '../../routes/userRoute'
import { useRouter } from "next/router";
import Link from "next/link";


const PromotionId = () => {
  const[state,setState] = useContext(UserContext)
  const[ndata,setNData] = useState("")
  const router = useRouter();
  const id = router.query._id;
  console.log("idxxx",id)
  useEffect(()=>{
    if(id) getData()

  },[id])
  const getData = async () => {
    const {data} = await axios.get(`/get-mail/${id}`)
    console.log("page--->",data)
    setNData(data)
  }
  const reRoute=()=>{
    router.push("/promotions/list")
  }
  return (

    <div>
    <div className="page_info">
      <div>
        <button className="darkGray_btn"onClick={reRoute} >
          <img  className="mr_12" />
          Back
        </button>
      </div>
    </div>

    <div className="divider_issue">
      <div className="issue_review">
        <div style={{ padding: 16 }}>
          <h3 className="heading24_bold mb_16">{ndata.title}</h3>
          <div className="mb_16">
            <label>Mail description</label>
            <p>{ndata.content}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default PromotionId
