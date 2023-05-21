// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const dfd = require("danfojs-node")
type Data = any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  function findpatient_avg_total(rawdata: any,facility:string,timepoint:string){

  

  
  var fieldNames = Object.keys(rawdata[0]);
  
  
  const newdf = new dfd.DataFrame(rawdata, { columns: fieldNames });


 //need to filter the dataframe by facility first and accept as a parameter:

 //const filteredfacility =  newdf.query(`facility==${filteredfac}`)
//this is the actual fitlered facility 
// now I need the time 
let facility_sub_df
let facility_time_sub_df

  facility_sub_df = newdf.loc({ rows: newdf["facility"].eq(facility)  });

 //if time does not exist or if facility does not exist , need a way to handle it with grace 
 facility_time_sub_df= facility_sub_df.loc({ rows: facility_sub_df["timepoint"].eq(timepoint)  })

 var  check = facility_time_sub_df.loc({ columns: ["timepoint","facility"]})


 




 //the following onlyu contain the criteria fields ....and for each clien t
 //so it is safe to sum them up....
 var filteredcolumnpatient1= fieldNames.filter(patient1)


  const filteredcolumnpatient2= fieldNames.filter(patient2)
  var  subsetfacility_time_frame_info_patient_1 = facility_time_sub_df.loc({ columns: [...filteredcolumnpatient1]})
  var  subsetfacility_time_frame_info_patient_2 = facility_time_sub_df.loc({ columns: [...filteredcolumnpatient2]})
  var subsetfacility_time_frame_info_patient_1= converttype(subsetfacility_time_frame_info_patient_1)
  var subsetfacility_time_frame_info_patient_2= converttype(subsetfacility_time_frame_info_patient_2)
  subsetfacility_time_frame_info_patient_1.print()
  subsetfacility_time_frame_info_patient_2.print()
  function converttype(frame:any){
    for (let column of frame.columns) {
      frame[column] = frame[column].asType("int32");
    }
    return frame

  }
  
let array1 = subsetfacility_time_frame_info_patient_1.$data[0]






//let grp = subsetfacility_time_frame_info.groupby(["timepoint"])
//let timeframe=grp.col(filteredcolumnpatient1).mean().print()

  

      function patient1(list:any){
        return list.includes("___1") 

      }
      function patient2(list:any){
        return list.includes("___2")

      }
      console.log(subsetfacility_time_frame_info_patient_1.mean().$data[0])
      console.log(subsetfacility_time_frame_info_patient_2.mean().$data[0])

    return [subsetfacility_time_frame_info_patient_1.mean().$data[0],subsetfacility_time_frame_info_patient_2.mean().$data[0]]

  }


  
  const monthlist=["1","2","3","4","5","6","7","8","9","10"]
  let search_facility=req.body.queryfacility
  let search_month=req.body.querymonth
  let patient_1_avg_specific_facility_specific_time
  let patient_2_avg_specific_facility_specific_time

  try{
    var bb=findpatient_avg_total(req.body.body,search_facility,search_month)
    patient_1_avg_specific_facility_specific_time=bb[0]
    patient_2_avg_specific_facility_specific_time=bb[1]
    

  }
  catch{
    res.status(200).json({ currentmonth_results: [],allmonths_result:[] })
    return 
  }
 
  
  var resultlist:any=[]
  var currentmonthresult=[patient_1_avg_specific_facility_specific_time,patient_2_avg_specific_facility_specific_time]
  monthlist.forEach((month)=>{
    try{
      var bb=findpatient_avg_total(req.body.body,search_facility,month)
    let patient_1_avg_specific_facility_specific_time=bb[0]
    let patient_2_avg_specific_facility_specific_time=bb[1]
     
    let monthresult=[patient_1_avg_specific_facility_specific_time,patient_2_avg_specific_facility_specific_time]
    resultlist.push(monthresult)
  
  }
    
    catch{
      return resultlist.push([])
    }
    
  



  })


  
  //i need the data for all actually and grab what I have so I can plot them...

  res.status(200).json({ currentmonth_results: currentmonthresult,allmonths_result:resultlist })
}
