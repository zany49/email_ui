import React,{useState,useContext} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";


const Sidebar = () => {
	  const router = useRouter();
    const[state,setState] = useContext(UserContext);

    const logout = ()=>{
      window.localStorage.removeItem("auth");
      setState(null);
      router.push('/login');
    }

  return (
    <>
     {state !== null ?(<>
      <div className="sidebar_wrapper">
      <div className="sidebar_logo">
        <img src="/images/logo.png" />
      </div>
      <ul>
        <li>
          <Link href="/dashboard">
            <a className={router.pathname == "/dashboard" ? "active" : ""}>
              <img src="/images/dashboard.svg" />
              <span className="menu_text">All Mail</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/primary/list">
            <a className={router.pathname == "/issues/list" ? "active" : ""}>
              <img src="/images/issues_icon.svg" />
              <span className="menu_text">Primary</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/social/list">
            <a className={router.pathname == "/issues/list" ? "active" : ""}>
              <img src="/images/calendar_icon.svg" />
              <span className="menu_text">Social</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/promotions/list">
            <a
              className={
                router.pathname == "/promotions/list" ? "active" : ""
              }
            >
              <img src="/images/visit_icon.svg" />
              <span className="menu_text">Promotions</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/sent/list">
            <a
              className={
                router.pathname == "/sent/list" ? "active" : ""
              }
            >
              <img src="/images/best_practices.svg" />
              <span className="menu_text">Sent</span>
            </a>
          </Link>
        </li>
        <li>
 
            <a onClick={logout}>
              {/* <img src="/images/best_practices.svg" /> */}
              <span className="menu_text">Logout</span>
            </a>
        </li>
      </ul>
    </div>
     
     </>):(<></>)}
    </>
   
 
  );
};

export default Sidebar;
