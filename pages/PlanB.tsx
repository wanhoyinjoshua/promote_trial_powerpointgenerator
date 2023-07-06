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
export default function PlanB() {
  const [hospitallist_local,setHospitallist]=useState<Items>({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auditnoREDCAP,setauditnoredcap]=useState([])
  const [hospitalnameREDCAP,sethospitalnameredcap]=useState([])
  const [xmldatabase,setxmldata]=useState<any>()
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function gethospitalname(hospitalnameblob:any){
    var parts = hospitalnameblob.split("|");
    //i will expect here having 7 items in the array 
    var indexnametuple=parts.map((item:any)=>{
      var a= item.split(",")
      const index=a[0]
      const name=a[1]



      return [index.trim(),name.trim()]
    })
    return indexnametuple

  }

  function getauditno(auditblob:any){

  }

  async function getmetafromcsv(){
    
  }

  async function getmeta(){
    const pulldataparamdata = {
      'token': 'D096517FD342E013171C1822C924A7D4',
      'content': 'metadata',
      'format': 'json',
      'returnFormat': 'json',
      'fields[0]': 'audit_hospital',
      'fields[1]': 'audit_number'
  }

    const options = {
      method: 'POST',
      body: new URLSearchParams(pulldataparamdata)
    };
    const response = await fetch('https://redcap.helix.monash.edu/api/', options);
      console.log(response)
      const data2 = await response.json();
      console.log(data2)
      const hospitalname=data2[0]
      const auditno=data2[1]
      
      console.log(gethospitalname(hospitalname.select_choices_or_calculations))
      console.log(gethospitalname(auditno.select_choices_or_calculations))
      
      setauditnoredcap(gethospitalname(auditno.select_choices_or_calculations))
      sethospitalnameredcap(gethospitalname(hospitalname.select_choices_or_calculations))

  }
   

  useEffect(() => {
    
    
    // Update the document title using the browser API
   
  },[]);

 
  const [querymonth,setMonth]=useState("1")
  
 
 
  const handlemonthchange = (event:any) => {
    setMonth(event.target.value);
  };
   // Number of items to generate

  const childButtonRefs = useRef<any>([]);
 
 
  // Function to trigger the child button click
  const handleClickall =() => {
   console.log(childButtonRefs)
   
   console.log(hospitalnameREDCAP)
   for (let i = 0; i <=hospitalnameREDCAP.length-1 ; i++) {
    childButtonRefs.current[i].clickButton()
  }
   
   
      
    
  
  };

  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
        if(event.target){
            const fileContent = event.target.result;
      parseXml(fileContent);

        }
      
    };

    reader.readAsText(selectedFile);
  };

  const parseXml = (xmlContent:any) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
    setxmldata(xmlDoc)
    setauditnoredcap(gethospitalmetafromxml(xmlDoc,"audit_number.choices"))
    sethospitalnameredcap(gethospitalmetafromxml(xmlDoc,"audit_hospital.choices"))
    console.log(xmlDoc); // Display the parsed XML document in the console
  };
  function getTagByIdWithXPath(xmlDoc:any, id:any) {
    
    
    const xpathExpression = `//*[@OID="${id}"]`;
    const xpathResult = xmlDoc.evaluate(xpathExpression, xmlDoc, null, XPathResult.ANY_TYPE, null);
    
    const element = xpathResult.iterateNext();
    return element;
  }
  
  function gethospitalmetafromxml(xmlstring:any,id:any):any{
    const hospitals= getTagByIdWithXPath(xmlstring,id)
    console.log(hospitals)
    //i need a list of [index,name]
    var hospitallist=hospitals.getElementsByTagName("CodeListItem")
    var codedlist=[]
    console.log(hospitallist)
    for (let i = 0; i < hospitallist.length; i++) {
        const element = hospitallist[i];
        // Perform operations on each element
        const value=element.querySelectorAll("TranslatedText")[0].innerHTML
        const index=element.getAttribute("CodedValue")
        codedlist.push([index,value])
      }
    
   
    

    return codedlist

  }



  
  


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
    <section>
    <input type="file" accept="application/xml, text/xml" onChange={handleFileChange} />
        </section>
       Select Timepoint
       <section className='mb-6'>
       <select  className="mb-3 mt-1.5 w-[25vw] bg-gray-200 rounded-lg border-gray-300 text-gray-700 sm:text-sm" value={querymonth} onChange={handlemonthchange}>
       {auditnoREDCAP&&auditnoREDCAP.map((option) => (
        <option key={option[0]} value={option[0]}>
          Audit {option[1]}
        </option>
      ))}
      </select> 
       <section className=''>
     
      
       <button className="inline-block rounded border border-pink-600 bg-pink-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring active:text-pink-500" onClick={handleClickall}>Export Data from all hospitals</button>
     


      </section>
      <section>
    
      
      
      </section>

       </section>
    
      
      <section className='mt-6'>
      <div className="max-w-full overflow-wrap-normal">
  <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
   

    <tbody className="divide-y divide-gray-200">
        {hospitalnameREDCAP&& hospitalnameREDCAP.map((option:any,index) => (
         
             <tr className='flex ' key={option[0]}>
     <Facilityrow xmldata={xmldatabase} auditlength={auditnoREDCAP.length} key={option[0]} ref={(ref) => childButtonRefs.current[index] = ref}
    facility={Number(option[0])} facilityname={option[1]} timepoint={querymonth} ></Facilityrow>
    </tr>
   
  ))}
</tbody>
  </table>
  </div>
  


      </section>
    
      
   
   
    </div>
  )
}



