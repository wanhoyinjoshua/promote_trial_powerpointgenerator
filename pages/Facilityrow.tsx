
import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';
import styles from '../styles/Home.module.css';
import PowerPointSlide from './ppt';
import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useState } from 'react';
const Facilityrow = forwardRef((props:any, ref) => {
  const [statuscode,setStatusCode]=useState("")
  const [powerpointdata,setPowerpointdata]=useState<any>()
  const buttonRef = useRef<HTMLButtonElement>(null);(null);
  useImperativeHandle(ref, () => ({
    // Expose a function to click the button
    clickButton: () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  }));

  useEffect(() => {
    console.log(props.xmldata)
    
  },[]);

  async function getfacilitydata(xmldata:any,hospitalno:string){
    const xpathExpression = `//SubjectData[FormData/ItemGroupData/ItemData[@ItemOID="audit_hospital" and @Value="1"]]`;
    var htmlcollection=xmldata.getElementsByTagName("FormData")
    const selector = `ItemData[ItemOID=audit_hospital]`;
    var hospitaldata=[]
    

    for (const element of htmlcollection) {
      const datafields=element.getElementsByTagName("ItemData")
      
      for (let i=0;i<datafields.length;i++){
        
        if(datafields[i].getAttribute("ItemOID")=="audit_hospital"){
          console.log(datafields[i])
          if (datafields[i].getAttribute("Value")==hospitalno){
            
            var obj:any={}
            for(const entry of datafields){
              obj[`${entry.getAttribute("ItemOID")}`]=entry.getAttribute("Value")
              
              

            }
            hospitaldata.push(obj)
  
          }
        }
  
      }
    }

    
    return hospitaldata
   

  }
   
  async function handleClick() {
    
    console.log("sishishi")
    console.log(props.facility)
    console.log(props.timepoint)
    setLoading(true)
    
    
    var data2=await getfacilitydata(props.xmldata,props.facility)
    

    if (data2[0]==null){
      setStatusCode("there is nothing from the database")
      setLoading(false)
      return

    }
    else{
      setStatusCode("success from redcap")

    }
    //now I have the form data for each facility. including all timepoints 
    // now i need to transform it into a list of obejcts

    
    

   
      function calculate_subscore_and_total(timepointobject:any){
        //this function assumes facility is already filtered 
        // and it assumes it is an object 
        var newob=timepointobject
        for (let key of Object.keys(timepointobject)) {
          if(timepointobject[key]=="66"){
            console.log(key)
            console.log("beforennigga")
            console.log(timepointobject)
            newob[key]="1"
            console.log(newob[key])
            


          }
          newob[key] = parseInt(newob[key]);
          
        }
        timepointobject=newob
        let sub_assessment:any=(timepointobject.ul_measure/1)*100
        let sub_goal_setting:any=((timepointobject.gs_ul+timepointobject.gs_ul_family+timepointobject.gs_ul_reviewed)/3)*100
        let sub_education=((timepointobject.ed_ul_prompts+timepointobject.ed_ul_self_practise)/2)*100
        let sub_therapy=((timepointobject.therapy_14_days+timepointobject.therapy_mental+timepointobject.therapy_es+timepointobject.therapy_mt+timepointobject.therapy_bt+timepointobject.therapy_cimt+timepointobject.therapy_al_rtst+timepointobject.therapy_al_strength)/8)*100
        let self_practice=(timepointobject.therapy_al_grasp/1)*100
        let sub_amount =((timepointobject.amount_ul_therapy+timepointobject.amount_ul_therapy_2)/2)*100
        let total = (sub_assessment+sub_goal_setting+sub_education+sub_therapy+self_practice+sub_amount)/6
        

        let sub_assessment2:any=(timepointobject.ul_measure2/1)*100
        let sub_goal_setting2:any=((timepointobject.gs_ul2+timepointobject.gs_ul2_family+timepointobject.gs_ul2_reviewed)/3)*100
        let sub_education2=((timepointobject.ed_ul2_prompts+timepointobject.ed_ul2_self_practise)/2)*100
        let sub_therapy2=((timepointobject.therapy2_14_days+timepointobject.therapy_mental2+timepointobject.therapy2_es+timepointobject.therapy2_mt+timepointobject.therapy2_bt+timepointobject.therapy2_cimt+timepointobject.therapy2_al_rtst+timepointobject.therapy2_al_strength)/8)*100
        let self_practice2=(timepointobject.therapy2_al_grasp/1)*100
        let sub_amount2 =((timepointobject.amount2_ul_therapy+timepointobject.amount2_ul_therapy_2)/2)*100
        let total2 = (sub_assessment2+sub_goal_setting2+sub_education2+sub_therapy2+self_practice2+sub_amount2)/6
        
        let auditno=timepointobject.audit_number

        return {
          "sub_assessment":[sub_assessment,sub_assessment2],
        "sub_goal_setting":[sub_goal_setting,sub_goal_setting2],
        "sub_education":[sub_education,sub_education2],
        "sub_therapy":[sub_therapy,sub_therapy2],
        "self_practice":[self_practice,self_practice2],
        "sub_amount":[sub_amount,sub_amount2],
        "total":[total,total2],
        "auditno":auditno,

        } 

        


      }
      
      //from here data 2 is a list of objects for a specific facility
      // so i need to save target month and rest of the months 
      //once i have the month need to pass into a function to get data, -->subscore and total score
      //once i have that function i pass that function to every timepoint 
      // and then i passs to ppt to present it.
      console.log(data2)
      console.log(props.timepoint)
      var filterabloibject=data2.filter((obj:any) => obj.audit_number == props.timepoint )
      var currenttimpointobject= filterabloibject[0]
      function myFunction(element:any) {
        return element.record_id
      }
      //now pass currentimeobject to the function calculatesubscroe 
      console.log(currenttimpointobject)
      console.log("this is the currenttime[pointpbject ")
      if (currenttimpointobject==undefined){
        setStatusCode("this record at this timepoit for this facility does not exist")
        setLoading(false)
        return
      }
      else if (filterabloibject.length>1){
        
        var dupid=filterabloibject.map(myFunction)
        setStatusCode(`this record at this timepoit for this facility has more than 1 record, for the results to be valid, only one record per timepoint per facility can exist--Duplicate record ids= ${JSON.stringify(dupid)}`)
        console.log("hihiduplicate")
        setLoading(false)
        return

      }
      var nullentries=[]
      for (const key in currenttimpointobject) {
        if (currenttimpointobject[key] == -1) {
          nullentries.push(key)

        }
      }
      console.log(nullentries)
      if (nullentries.length>0){
        setStatusCode(`this record at this timepoit for this facility has missing values- id from redcap:*${currenttimpointobject.record_id}*, missing fields=${JSON.stringify(nullentries)}`)
        console.log("hihiduplicate")
        setLoading(false)
        return

      }
      const graph_data_time=currenttimpointobject.audit_date
      const current_graph_data= calculate_subscore_and_total(currenttimpointobject)
      const alldata=data2.map((timepointobject:any)=>{return calculate_subscore_and_total(timepointobject)})
      
      //now need to pass current graph_data and all data to the powerpoint generation
      const powerpointdata_new={"current":current_graph_data,"all":alldata,"time":graph_data_time}
      console.log("powerpoint")
      console.log(powerpointdata_new)
      setPowerpointdata(powerpointdata_new)
      var fieldNames = Object.keys(data2[0]);
      
      
      
     
      const filteredcolumnpatient1= fieldNames.filter(patient1)
      const filteredcolumnpatient2= fieldNames.filter(patient2)
      setStatusCode("success")
      
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
    
    


   
 
      <tr className='flex w-screen '>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-1/5">
        Key in REDCAP = {props.facility}: <br></br>
       <span className="bg-green-200"><strong>Name: {props.facilityname}</strong> </span> 
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700 w-1/5">
          <button
          ref={buttonRef}
            onClick={handleClick}
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Export Data from REDCAP
          </button></td>
        <td className="whitespace-normal px-4 py-2 text-gray-700 w-1/5">
        {statuscode=="success"?<PowerPointSlide data={powerpointdata} queryfacility={props.facility} timepoint={props.timepoint} facilityname={props.facilityname} auditlength={props.auditlength} ></PowerPointSlide>:<div></div>}

        </td>
        <td className=" break-words px-4 py-2 text-gray-700 w-1/4 max-w-1/4">
          <span className='break-words  w-1/4'>{statuscode}</span>
        </td>
        
      </tr>

     
   
    
     
    
     
    
     
     
    </>
  )
})

Facilityrow.displayName = 'Facilityrow';

export default Facilityrow