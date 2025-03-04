import React, { useState,useEffect}from "react";
import {useParams} from 'react-router-dom';
import ShareButton from "../ShareButton/ShareButton";
import CopyButton from "../CopyButton/CopyButton";
import Modal from '../Modal/Modal'
import axios from "axios";
import copy from "copy-to-clipboard";
import style from "./SharePage.module.css";
import { ToastContainer, toast } from 'react-toastify';
import xss from 'xss';
import 'react-toastify/dist/ReactToastify.css';

const SharePage = () => {
  const {id} = useParams();
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://justpasteitapi.herokuapp.com/add/${id}`
      );

      let text = xss(result.data['content']);
      setData(text);
      console.log(text); // Debug log
    };
 
    fetchData();
  }, [data, id]);

 
  const notify = () =>{
    copy(data);
    toast("Text Copied📋");
  }


  return (
    <div>
    <div className={style.textarea_exp}>
      <p dangerouslySetInnerHTML={{__html: data}}></p> {/*Data was sanitized with the XSS library*/}
    </div>

    <div className={style.actions}>
    <ShareButton onSubmit={()=>setIsOpen(true)} created />
    <CopyButton  onSubmit={notify}/>


<ToastContainer
position="bottom-center"
autoClose={1000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
    <Modal id={id} open={isOpen} onClose={() => setIsOpen(false)}/> 
    </div>
    
  );
};

export default SharePage;
