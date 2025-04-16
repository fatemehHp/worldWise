import React from 'react'
import styles from './BackButton.module.css';
import {  useNavigate } from 'react-router-dom';

export default function BackButton(   {children}) {
    const navigate = useNavigate();

    function handleBack(e){
        console.log("back")
     e.preventDefault()
     navigate(-1)
    }
  return (
   <button onClick={(e)=>handleBack(e)} className={styles.backbtn }>
    {children}
   </button>
  )
}
