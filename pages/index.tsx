import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';

import PowerPointSlide from './ppt';
import React from 'react';
import { useState } from 'react';

export default function Home() {

   
  async function handleClick() {
    setLoading(true)
    console.log(formData)
    var jsoned= JSON.stringify([formData])
    console.log(jsoned)
   
    
    
    const data = {
      token: 'F704AC4CBBF8D94FF1ACBC0900A404F4',
      content: 'record',
      action: 'import',
      format: 'json',
      type: 'flat',
      overwriteBehavior: 'normal',
      forceAutoNumber: 'false',
      data: jsoned,
      returnContent: 'count',
      returnFormat: 'json'
    };

    const pulldataparamdata = {
      'token': '5C67A0F931B59191588935B7E7C57B70',
      'content': 'record',
      'action': 'export',
      'format': 'json',
      'type': 'flat',
      'csvDelimiter': '',
      'fields[0]': 'record_id',
      'fields[1]': 'timepoint',
      'fields[2]': 'facility',
      'fields[3]': 'criteria_1',
      'fields[4]': 'criteria_2',
      'fields[5]': 'criteria_3',
      'fields[6]': 'form_1_complete',
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
      console.log(data2)
      var fieldNames = Object.keys(data2[0]);
      console.log(fieldNames)
      const filteredcolumnpatient1= fieldNames.filter(patient1)
      const filteredcolumnpatient2= fieldNames.filter(patient2)
      setStatusCode(JSON.stringify(data2))
      
      setLoading(false)
      let realdata={body:data2,querymonth:querymonth,queryfacility:queryfacility}
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
      console.log(datafinal)
      //the data is finally here, and  i HAVE TO NOW PASS THIS TO POWERPOINT GENERARTION
      setPowerpointdata(datafinal)
      function patient1(list:any){
        return list.includes("___1")

      }
      function patient2(list:any){
        return list.includes("___2")

      }
      console.log(filteredcolumnpatient1)
      console.log(filteredcolumnpatient2)
      const newdf = new DataFrame(data2, { columns: fieldNames });
    
     
     
    
      console.log(statuscode)
      
      
   
    
   

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
  const [formData, setFormData] = useState({
    record_id: '',
    a: '',
    b:'',
    c:''
  });
  
  const handlefacilityChange = (event:any) => {
    setFacility(event.target.value);
  };

  const handlemonthchange = (event:any) => {
    setMonth(event.target.value);
  };
  

  return (
    <div>
     {loading?<div>loading</div>:null}
      
      Facility
      <select value={queryfacility} onChange={handlefacilityChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      Month
      <select value={querymonth} onChange={handlemonthchange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button onClick={handleClick}>
        Export record in redcap
      </button>
      <PowerPointSlide data={powerpointdata} queryfacility={queryfacility} timepoint={querymonth} ></PowerPointSlide>
      
   
    </div>
  )
}
