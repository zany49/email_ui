import '../styles/globals.scss'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify';
import {useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from '../context';



function MyApp({ Component, pageProps }) {
      const router = useRouter()
      useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        // toast("Hello world!" );
      }, []);
  return (
    <>
      {router.pathname !== "/" &&
      router.pathname !== "/forget-password" &&
      router.pathname !== "/login" ? (
        <>
        <UserProvider>
          <div className={"page_wrapper"}>
            <Sidebar />
            <div className="content_wrapper">
              <Header />
              <ToastContainer position="top-right"/>
              <Component {...pageProps} />
            </div>
          </div>
          </UserProvider>
        </>
      ) : (
        <>
           <UserProvider>
          <ToastContainer position="top-right"/>
          <Component {...pageProps} />
          </UserProvider>
        </>
      )}
    </>
  );
    }

export default MyApp;
