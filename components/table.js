import React,{useState,useContext, useEffect} from 'react'
import  { UserContext } from '../context';
import  axios from 'axios'
import { useRouter } from "next/router";


const MailTable = ({data})=>{
  const[state,setState] = useContext(UserContext)
  const router = useRouter();
  const handleTouch = async (id,category)=>{
    console.log("bacjhabjcjbdsd",id,category)
    if(category === 'Primary'){
      router.push(`/primary/${id}`)
    }
    if(category === 'Social'){
      router.push(`/social/${id}`)
    }
    if(category === 'Promotion'){
      router.push(`/promotions/${id}`)
    }
  }

    return (

        <>
             <div className="Table_wrapper Table_responsive">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
          {
                data.map((d)=>{
            return(
              
            <tr key={d._id} onClick={()=>handleTouch(d._id,d.category)}>
                <>
                <td>{d.title}</td>
              <td>
                <div className="DisplayFlex AlignItem_center justifycontent_spacebetween">
                  <div>
                    <p className="extratable_td"> {d.updatedAt}</p>
                  </div>
                  <div>
                   <a href="#">
                       <img src="/images/chevron_right.svg" />
                     </a>
                  </div>
                 </div>
             </td>
              </>
            
              </tr>
                )})
              }{" "}
          </tbody>
        </table>
      </div>
        
        </>

    )

}



export default MailTable;