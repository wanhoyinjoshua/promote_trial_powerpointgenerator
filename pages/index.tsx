import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';
import Facilityrow from './Facilityrow';
import styles from '../styles/Home.module.css';
import PowerPointSlide from './ppt';
import React ,{useRef} from 'react';
import { useState } from 'react';

export default function Home() {

   

  

 
  const [querymonth,setMonth]=useState("1")
 
 
  const handlemonthchange = (event:any) => {
    setMonth(event.target.value);
  };
  const childButtonRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null)
    
  ];

  // Function to trigger the child button click
  const handleClickall = () => {
    childButtonRefs.forEach(ref => {
      if (ref.current) {
        ref.current.clickButton();
      }
    });
  };

  return (
    <div className="p-6" >
      <div className=" bg-gray-200">
      <h2 className="text-3xl font-bold sm:text-4xl">PROMOTE Trial Powerpoint Generator 2023 </h2>

      <p className="mt-4 ">
        Redcap public survey link:<br></br>
        <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"href='https://redcap.helix.monash.edu/surveys/?s=XPT73AD9YMFKLNLN' target='_blank'>https://redcap.helix.monash.edu/surveys/?s=XPT73AD9YMFKLNLN</a><br>
        </br>
        This tool automates the process of pulling data from redcap and generating a powerpoint presentation based on the data pulled.
        To use this tool, you need to first specifiy the timepoint - audit no of interest. You can then either click export data for all hospitals and there is any data , an orange button should be displayed to generate the ppt.
        Alternatively you can do it one by one.
        <br>
        </br>
        Error messages:<br>
        </br>
  <strong>there is nothing from the database</strong>- meaning there is no record for all timepoints .<br></br>
<strong>this record at this timepoint for this facility does not exist</strong>- there are records for that hospital but not at that timepoint,
<br></br>
<strong>
this record at this timepoint for this facility has more than 1 record, for the results to be valid, only one record per timepoint per facility can exist</strong>- please delete the duplicate in redcap.
      </p>
    </div>
    <br></br>
       Select Timepoint
       <section className='mb-6'>
       <select  className="mb-3 mt-1.5 w-[25vw] bg-gray-200 rounded-lg border-gray-300 text-gray-700 sm:text-sm" value={querymonth} onChange={handlemonthchange}>
        <option value="1">Audit 1</option>
        <option value="2">Audit 2 </option>
        <option value="3">Audit 3 </option>
        <option value="4">Audit 4 </option>
        <option value="5">Audit 5</option>
        <option value="6">Audit 6 </option>
        <option value="7">Audit 7 </option>
        <option value="8">Audit 8 </option>
        <option value="9">Audit 9 </option>
        <option value="10">Audit 10</option>
        <option value="11">Audit 11 </option>
        <option value="12">Audit 12 </option>
        <option value="13">Audit 13 </option>
      </select> 
       <section className=''>
     
      
       <button className="inline-block rounded border border-pink-600 bg-pink-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring active:text-pink-500" onClick={handleClickall}>Export Data from all hospitals</button>
     


      </section>

       </section>
      
      
   
    <section className='mt-6'>
      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[0]} facility={"1"} timepoint={querymonth} ></Facilityrow>

      </div>
    
      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[1]} facility={"2"} timepoint={querymonth} ></Facilityrow>

      </div>

      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[2]} facility={"3"} timepoint={querymonth} ></Facilityrow>

      </div>
      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[3]} facility={"4"} timepoint={querymonth} ></Facilityrow>

      </div>

      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[4]} facility={"5"} timepoint={querymonth} ></Facilityrow>

      </div>
    
      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[5]} facility={"6"} timepoint={querymonth} ></Facilityrow>

      </div>

      <div className={styles.facilityrow}>
      <Facilityrow ref={childButtonRefs[6]} facility={"7"} timepoint={querymonth} ></Facilityrow>

      </div>

    </section>
      
      
   
   
    </div>
  )
}
