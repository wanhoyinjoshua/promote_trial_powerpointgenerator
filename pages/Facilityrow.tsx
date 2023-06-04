
import Head from 'next/head'
import Image from 'next/image'
import { DataFrame } from 'danfojs';
import styles from '../styles/Home.module.css';
import PowerPointSlide from './ppt';
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
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
   
  async function handleClick() {
    
    console.log("sishishi")
    console.log(props.facility)
    console.log(props.timepoint)
    setLoading(true)
    
    
    
    

    const pulldataparamdata = {
      'token': 'D31D0593249F5F50DF7CB3A7903AE48D',
      'content': 'record',
      'action': 'export',
      'format': 'json',
      'type': 'flat',
      'csvDelimiter': '',
      'fields[0]': 'record_id',
      'fields[1]': 'record_id_2e730d',
      'fields[2]': 'audit_hospital',
      'fields[3]': 'audit_number',
      'fields[4]': 'audit_date',
      'fields[5]': 'demographics',
      'fields[6]': 'date_of_stroke',
      'fields[7]': 'date_admission_rehab',
      'fields[8]': 'reach_score',
      'fields[9]': 'reach_score_2',
      'fields[10]': 'reach_score_3',
      'fields[11]': 'safe_shoulder',
      'fields[12]': 'safe_finger',
      'fields[13]': 'safe_score_total',
      'fields[14]': 'ul_measure',
      'fields[15]': 'ul_measure_na',
      'fields[16]': 'name_outcome_measures',
      'fields[17]': 'gs_ul',
      'fields[18]': 'gs_ul_explanation',
      'fields[19]': 'gs_ul_family',
      'fields[20]': 'gs_ul_reviewed_explained_2',
      'fields[21]': 'gs_ul_reviewed',
      'fields[22]': 'gs_ul_reviewed_explained',
      'fields[23]': 'ed_ul_prompts',
      'fields[24]': 'ed_ul_na',
      'fields[25]': 'ed_ul_self_practise',
      'fields[26]': 'ul_educational_prompts_2',
      'fields[27]': 'therapy_14_days',
      'fields[28]': 'therapy_14_days_na',
      'fields[29]': 'therapy_mental',
      'fields[30]': 'mental_practise_na',
      'fields[31]': 'therapy_es',
      'fields[32]': 'therapy_es_na',
      'fields[33]': 'therapy_mt',
      'fields[34]': 'therapy_mt_na',
      'fields[35]': 'therapy_bt',
      'fields[36]': 'therapy_bt_na',
      'fields[37]': 'therapy_cimt',
      'fields[38]': 'explain_cimt_na',
      'fields[39]': 'therapy_al_rtst',
      'fields[40]': 'explain_cimt_na_2',
      'fields[41]': 'therapy_al_strength',
      'fields[42]': 'explain_cimt_na_3',
      'fields[43]': 'therapy_il_splints',
      'fields[44]': 'therapy_il_weakness',
      'fields[45]': 'therapy_il_weakness_2',
      'fields[46]': 'therapy_al_grasp',
      'fields[47]': 'self_practise_na',
      'fields[48]': 'amount_ul_therapy',
      'fields[49]': 'amount_ul_therapy_na',
      'fields[50]': 'amount_ul_therapy_2',
      'fields[51]': 'amount_ul_therapy_na_2',
      'fields[52]': 'demographics2',
      'fields[53]': 'date_of_stroke2',
      'fields[54]': 'date_admission_rehab2',
      'fields[55]': 'reach_score2',
      'fields[56]': 'reach_score2_2',
      'fields[57]': 'reach_score2_3',
      'fields[58]': 'safe_shoulder2',
      'fields[59]': 'safe_finger2',
      'fields[60]': 'safe_score_total2',
      'fields[61]': 'ul_measure2',
      'fields[62]': 'ul_measure_na2',
      'fields[63]': 'name_outcome_measures2',
      'fields[64]': 'gs_ul2',
      'fields[65]': 'gs_ul2_explanation',
      'fields[66]': 'gs_ul2_family',
      'fields[67]': 'gs_ul2_reviewed_explained_2',
      'fields[68]': 'gs_ul2_reviewed',
      'fields[69]': 'gs_ul2_reviewed_explained',
      'fields[70]': 'ed_ul2_prompts',
      'fields[71]': 'ed_ul2_na',
      'fields[72]': 'ed_ul2_self_practise',
      'fields[73]': 'ul2_educational_prompts_2',
      'fields[74]': 'therapy2_14_days',
      'fields[75]': 'therapy2_14_days_na',
      'fields[76]': 'therapy_mental2',
      'fields[77]': 'mental_practise2_na',
      'fields[78]': 'therapy2_es',
      'fields[79]': 'therapy2_es_na',
      'fields[80]': 'therapy2_mt',
      'fields[81]': 'therapy2_mt_na',
      'fields[82]': 'therapy2_bt',
      'fields[83]': 'therapy2_bt_na',
      'fields[84]': 'therapy2_cimt',
      'fields[85]': 'explain2_cimt_na',
      'fields[86]': 'therapy2_al_rtst',
      'fields[87]': 'explain2_cimt_na_2',
      'fields[88]': 'therapy2_al_strength',
      'fields[89]': 'explain2_cimt_na_3',
      'fields[90]': 'therapy2_il_splints',
      'fields[91]': 'therapy2_il_weakness',
      'fields[92]': 'therapy2_il_weakness_2',
      'fields[93]': 'therapy2_al_grasp',
      'fields[94]': 'self2_practise_na',
      'fields[95]': 'amount2_ul_therapy',
      'fields[96]': 'amount2_ul_therapy_na',
      'fields[97]': 'amount2_ul_therapy_2',
      'fields[98]': 'amount2_ul_therapy_na_2',
      'fields[99]': 'discussion_ideas',
      'fields[100]': 'fortnightly_clinical_audit_complete',
      'rawOrLabel': 'raw',
      'rawOrLabelHeaders': 'raw',
      'exportCheckboxLabel': 'false',
      'exportSurveyFields': 'false',
      'exportDataAccessGroups': 'false',
      'returnFormat': 'json',
      'filterLogic': `[audit_hospital] =${props.facility}`
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
      function calculate_subscore_and_total(timepointobject:any){
        //this function assumes facility is already filtered 
        // and it assumes it is an object 
        for (let key of Object.keys(timepointobject)) {
          timepointobject[key] = parseInt(timepointobject[key]);
        }
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
        


        return {
          "sub_assessment":[sub_assessment,sub_assessment2],
        "sub_goal_setting":[sub_goal_setting,sub_goal_setting2],
        "sub_education":[sub_education,sub_education2],
        "sub_therapy":[sub_therapy,sub_therapy2],
        "self_practice":[self_practice,self_practice2],
        "sub_amount":[sub_amount,sub_amount2],
        "total":[total,total2]

        } 

        


      }
      
      //from here data 2 is a list of objects for a specific facility
      // so i need to save target month and rest of the months 
      //once i have the month need to pass into a function to get data, -->subscore and total score
      //once i have that function i pass that function to every timepoint 
      // and then i passs to ppt to present it.
      var currenttimpointobject= data2.filter((obj:any) => obj.audit_number == props.timepoint )[0]
      //now pass currentimeobject to the function calculatesubscroe 
      if (currenttimpointobject==undefined){
        setStatusCode("this record at this timepoit for this facility does not exist")
        setLoading(false)
        return
      }
      else if (currenttimpointobject.length>1){
        setStatusCode("this record at this timepoit for this facility has more than 1 record, for the results to be valid, only one record per timepoint per facility can exist")


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
    


   
    <div className="overflow-x-auto">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
   

    <tbody className="divide-y divide-gray-200">
      <tr className='flex'>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          Hospital {props.facility} 
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          <button
          ref={buttonRef}
            onClick={handleClick}
            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Export Data from redcap
          </button></td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {statuscode=="success"?<PowerPointSlide data={powerpointdata} queryfacility={props.facility} timepoint={props.timepoint} ></PowerPointSlide>:<div></div>}

        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
          {statuscode}
        </td>
        
      </tr>

     
    </tbody>
  </table>
</div>
    
     
    
     
    
     
     
    </>
  )
})

export default Facilityrow