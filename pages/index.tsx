import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';
import Facilityrow from './Facilityrow';
import styles from '../styles/Home.module.css';
import PowerPointSlide from './ppt';
import React ,{useRef} from 'react';
import { useState,useEffect } from 'react';
import { kv } from '@vercel/kv';
import { Suspense } from 'react';
import Hospitals from '../components/hospitals';
import Modal from 'react-modal';
type Items = {
  [key: string]: string;
};
export default function Home() {
  const [hospitallist_local,setHospitallist]=useState<Items>({})
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
   

  useEffect(() => {
    // Update the document title using the browser API
    var hospitalobject={
      "0":"hospital1",
      "1":"hospital2",
      "2":"hospital3",
      "3":"hospital4",
      "4":"hospital5",
      "5":"hpspital6",
      "6":"hospital7"
    }
    if (localStorage.getItem('hospitals')==null){
      localStorage.setItem('hospitals', JSON.stringify(hospitalobject));

    }
    
    var hospitallist=localStorage.getItem('hospitals')
    
    {hospitallist&&setHospitallist(JSON.parse(hospitallist))}
    
  },[]);

 
  const [querymonth,setMonth]=useState("1")
  
 
 
  const handlemonthchange = (event:any) => {
    setMonth(event.target.value);
  };
   // Number of items to generate

  const childButtonRefs = [useRef<any>(null),useRef<any>(null),useRef<any>(null),useRef<any>(null),useRef<any>(null),useRef<any>(null),useRef<any>(null)]

  // Function to trigger the child button click
  const handleClickall = () => {
    console.log("hi")
    childButtonRefs.forEach(ref => {
      if(ref.current){
        ref.current.clickButton();
        
      }
        
      
    });
  };

  const handleInputChange = (e:any,key:any) => {
    console.log(e.target.value);
    console.log(key)
    var newhospital=hospitallist_local
    newhospital[key]=e.target.value
    console.log(newhospital)
    setHospitallist(newhospital)
    localStorage.setItem('hospitals', JSON.stringify(newhospital));

  };

  const RenderList=
    Object.entries(hospitallist_local).map(([key, value]) => (
      <Facilityrow key={key} ref={childButtonRefs[Number(key)]} facility={Number(key)} facilityname={value} timepoint={querymonth} ></Facilityrow>

    ));


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
<br>
</br>
<strong>this record at this timepoit for this facility has missing values</strong> this means that fields required for calculation is not filled in by user
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
      <section>
      <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Edit Hospital Names
      </button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg absolute inset-0 flex flex-col items-center justify-center">
  <h2 className="text-lg font-bold mb-2">Edit Hospital Names</h2>
  {Object.entries(hospitallist_local).map(([key, value]) => (
      <div key={key}>
        {key} :  <input placeholder={hospitallist_local[key]} onChange={()=>{handleInputChange(event,key)}}></input>
        </div>

    ))}
  
  <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Close Modal
  </button>
</div>
        </div>
      </Modal>
      </section>

       </section>
    
      
      <section className='mt-6'>
        {RenderList}

      </section>
    
      
   
   
    </div>
  )
}


async function Talks() {
  await kv.set('key', 'value');
let data:any = await kv.get('key');
console.log(data)
  return <div>{JSON.stringify(data)}</div>;
}
