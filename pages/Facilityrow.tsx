
import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';
import styles from '../styles/Home.module.css';
import PowerPointSlide from './ppt';
import React from 'react';
import { useState } from 'react';
const Facilityrow = (props:any) => {
    
   
  async function handleClick() {
    
    console.log("sishishi")
    console.log(props.facility)
    console.log(props.timepoint)
    setLoading(true)
    
    
    
    

    const pulldataparamdata = {
        'token': '4235A574AA340368BDF014F856AED8CF',
        'content': 'record',
        'action': 'export',
        'format': 'json',
        'type': 'flat',
        'csvDelimiter': '',
        'fields[0]': 'record_id',
        'fields[1]': 'facility',
        'fields[2]': 'timepoint',
        'fields[3]': 'criteria_1',
        'fields[4]': 'criteria_2',
        'fields[5]': 'criteria_3',
        'fields[6]': 'criteria_4',
        'rawOrLabel': 'raw',
        'rawOrLabelHeaders': 'raw',
        'exportCheckboxLabel': 'false',
        'exportSurveyFields': 'false',
        'exportDataAccessGroups': 'false',
        'returnFormat': 'json'
    }
    const options = {
      method: 'POST',
      body: new URLSearchParams(pulldataparamdata)
    };
  
      const response = await fetch('https://redcapdemo.vanderbilt.edu/api/', options);
      
      const data2 = await response.json();
      const statuscode= response.status
      if (data2[0]==null){
        setStatusCode("there is nothing from the database")
        setLoading(false)
        return

      }
      else{
        setStatusCode("success from redcap")

      }
      
        var fieldNames = Object.keys(data2[0]);
      
      
      
     
      const filteredcolumnpatient1= fieldNames.filter(patient1)
      const filteredcolumnpatient2= fieldNames.filter(patient2)
      setStatusCode(JSON.stringify(data2))
      
      setLoading(false)
      let realdata={body:data2,querymonth:props.timepoint,queryfacility:props.facility}
      const option = {
        method: 'POST', // Set the HTTP method (e.g., POST, GET, PUT, DELETE)
        headers: {
          'Content-Type': 'application/json', // Set the content type of the request body
          // Add any additional headers if required
        },
        body: JSON.stringify(realdata) // Convert the object to JSON string
      };
      const res= await fetch ("/api/hello",option)
      const datafinal = await res.json();
      
      //the data is finally here, and  i HAVE TO NOW PASS THIS TO POWERPOINT GENERARTION
      setPowerpointdata(datafinal)
      function patient1(list:any){
        return list.includes("___1")

      }
      function patient2(list:any){
        return list.includes("___2")

      }

      const newdf = new DataFrame(data2, { columns: fieldNames });
    
     
     
    

      
      
   
    
   

  }
  const [slideData, setSlideData] = useState({});
   const COLOR_RED = "FF0000";
   const COLOR_YLW = "F2AF00";
   const COLOR_GRN = "7AB800";
   const COLOR_UNK = "A9A9A9";
   const COLOR_COMP = "4472C4";
   const COLOR_CANC = "672C7E";
   const COLORS_RYGU = [COLOR_RED, COLOR_YLW];
   const dataChartPieStat = [
    {
      name: "Project Status",
      labels: ["Red", "Yellow"],
      values: [25, 75],
    },
  ];
  const [statuscode,setStatusCode]=useState("")
  const [powerpointdata,setPowerpointdata]=useState()
  const [ queryfacility,setFacility]=useState("1")
  const [querymonth,setMonth]=useState("1")
  const [loading,setLoading]=useState(false)
 
  
  const handlefacilityChange = (event:any) => {
    setFacility(event.target.value);
  };

  const handlemonthchange = (event:any) => {
    setMonth(event.target.value);
  };
  return (
    <>
    {loading?<div>loading</div>:<div></div>}
    <div className={styles.container}>
        <section className={styles.item}>
        Facility {props.facility}
        </section>

        <section className={styles.item}>
        <button onClick={handleClick}>
        Export record in redcap
      </button>
      <PowerPointSlide data={powerpointdata} queryfacility={props.facility} timepoint={props.timepoint} ></PowerPointSlide>

        </section>

    </div>
     
    
     
    
     
     
    </>
  )
}

export default Facilityrow