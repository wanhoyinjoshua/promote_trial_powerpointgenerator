import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';
import Facilityrow from './Facilityrow';
import styles from '../styles/Home.module.css';
import PowerPointSlide from './ppt';
import React from 'react';
import { useState } from 'react';

export default function Home() {

   

  

 
  const [querymonth,setMonth]=useState("1")
 
 
  const handlemonthchange = (event:any) => {
    setMonth(event.target.value);
  };
  

  return (
    <div>
      Select Timepoint
      <select value={querymonth} onChange={handlemonthchange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
   
    <section>
      <div className={styles.facilityrow}>
      <Facilityrow facility={"1"} timepoint={querymonth} ></Facilityrow>

      </div>
    
      <div className={styles.facilityrow}>
      <Facilityrow facility={"2"} timepoint={querymonth} ></Facilityrow>

      </div>

      <div className={styles.facilityrow}>
      <Facilityrow facility={"3"} timepoint={querymonth} ></Facilityrow>

      </div>
      <div className={styles.facilityrow}>
      <Facilityrow facility={"4"} timepoint={querymonth} ></Facilityrow>

      </div>

    </section>
      
      
   
   
    </div>
  )
}
