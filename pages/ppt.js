import { useState } from "react";
import PptxGenJS from "pptxgenjs";
import pptxgen from "pptxgenjs";

export default function PowerPointSlide(props) {
	console.log
	const [powerpointloading,setpowerload]=useState()
	
 if (props.data){
		console.log(props.data)
		

		let barchartpatient1data=props?.data.allmonths_result
		let alldata= props?.data.all
		// i need to transform all data:

		let current=props?.data.current
		console.log("presentationdata")
		console.log("all data")
		const ggg=[1,2,3,4,5,6,7,8,9,10,11,12,13]
		var refinedalldata=[]
		console.log(alldata)
		for (let i = 0; i <= ggg.length-1; i++) {
			console.log(alldata.length)
			var present=false
			alldata.forEach(element => {
				if (ggg[i]==element.auditno){
					refinedalldata.push(element)
					present=true

				}
				

				
			});
			if (present!=true){
				refinedalldata.push({
					"sub_assessment":0,
        "sub_goal_setting":0,
        "sub_education":0,
        "sub_therapy":0,
        "self_practice":0,
        "sub_amount":0,
        "total":[0,0],
        "auditno":ggg[i],
				})

			}

			
		  }
		alldata=refinedalldata
		console.log("bitchass niigga")
		console.log(alldata)
		console.log(alldata)
		console.log(current)
		let time =props?.data.time
		console.log(barchartpatient1data)
		
		//i need it in the form of two objects with the value field name , names and labels
		function convertbarchartdata_first(patient1,patient2){
		  
		  const firstpatient=	{
			  name: "patient 1",
			  labels: ["","patient 1","patioent2",""],
			  values: [0,patient1,patient2,0]
		  }	
		 
		  const master=[firstpatient]
	  return master
		}
		function convertbarchartdata_second(){
		  
			const patient1=	{
				name: "patient1",
				labels: ["","assessment","goalsetting","education","therapy","selfpractice","amount",""],
				values: [0,current.sub_assessment[0],current.sub_goal_setting[0],current.sub_education[0],current.sub_therapy[0],current.self_practice[0],current.sub_amount[0],0]
			}	
			const patient2=	{
				name: "patient1",
				labels: ["","assessment","goalsetting","education","therapy","selfpractice","amount",""],
				values: [0,current.sub_assessment[1],current.sub_goal_setting[1],current.sub_education[1],current.sub_therapy[1],current.self_practice[1],current.sub_amount[1],0]
			}	
			
		   
			const master=[patient1,patient2]
		return master
		  }

		function convertbarchartdata_third(){
			console.log("shit")
			//so now the data is literally a list 
			console.log(alldata)
			var dataarray=alldata.map((data)=>{ return data.total[0]/2+data.total[1]/2})
			
			dataarray.unshift(0);

			// Add item to the end of the array
			dataarray.push(0);
			const patient1=	{
				name: "patient1",
				labels: ["","Audit 1","Audit 2","Audit 3","Audit 4","Audit 5","Audit 6","Audit 7","Audit 8","Audit 9","Audit 10","Audit 11","Audit 12","Audit 13",""],
				values: dataarray
			}	
			
			
		   
			const master=[patient1]
		return master

		}
		 const COLOR_RED = "FF0000";
		 const COLOR_YLW = "F2AF00";
		 const COLOR_GRN = "7AB800";
		 const COLOR_UNK = "A9A9A9";
		 const COLOR_COMP = "4472C4";
		 const COLOR_CANC = "672C7E";
		 const COLORS_RYGU = [COLOR_RED, COLOR_YLW];
		 const EVSALES_LBLS = ["2010", "2011", "2012", "2013", "2014", "2015"];
		 
		const first_barchart=[]
		 const handleDownload = () => {
			setpowerload(true)
		  let pres = new pptxgen();
		  
		  pres.defineSlideMaster({
			title: "MASTER_SLIDE",
			background: { color: "FFFFFF" },
			objects: [
			 { line: { x: 3.5, y: 1.0, w: 6.0, line: { color: "0088CC", width: 5 } } },
			 { rect: { x: 0.0, y: 5.3, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
			 { text: { text: "Status Report", options: { x: 3.0, y: 5.3, w: 5.5, h: 0.75 } } },
			 { image: { x: 11.3, y: 6.4, w: 1.67, h: 0.75, path: "images/logo.png" } },
			],
			slideNumber: { x: 0.3, y: "90%" },
		   });
		  
		 
	  
		 
	   var  slide=pres.addSlide()
		
		var slide3 =pres.addSlide()
		var slide4=pres.addSlide()
		var slide5=pres.addSlide()
		var slide6=pres.addSlide()
		var recommendslide1=pres.addSlide()
		var recommendslide2=pres.addSlide()
		var recommendslide3=pres.addSlide()
		var recommendslide4=pres.addSlide()
		var recommendslide5=pres.addSlide()
		var recommendslide6=pres.addSlide()
		var recommendslide7=pres.addSlide()
		var recommendslide8=pres.addSlide()
		var recommendslide9=pres.addSlide()
		var recommendslide10=pres.addSlide()
		



		
		let optsChartBar2 = {
			  x: 1, y: 1, w: 8, h: 4,
			  barDir: "col",
			  plotArea: { fill: { color: "E1F1FF" } },
	  
			  dataBorder: { pt: 1, color: "F1F1F1" },
			  dataLabelColor: "696969",
			  dataLabelFontFace: "Arial",
			  dataLabelFontSize: 11,
			  dataLabelPosition: "outEnd",
			  dataLabelFormatCode: "#.0",
			  showValue: true,
		  showLabel:true,
		  
	  
			  catAxisHidden: false,
			  catGridLine: { style: "none" },
			  valAxisHidden: false,
			  valAxisDisplayUnitLabel: true,
			  valGridLine: { style: "none" },
	  
			  showLegend: true,
			  legendPos: "b",
			  showTitle: true,
		  };
		let arrDataRegions = convertbarchartdata_first(current.total[0],current.total[1])
		let chart2data=convertbarchartdata_second()
		let chartdata3=convertbarchartdata_third()
		
		const firstgraph_props={
			x: 0, y: 0, w: "100%", h: "100%",
			
			chartArea: { fill: { color: "F1F1F1" } },
			barDir: "col",
			
			//
			catAxisLabelColor: "494949",
			catAxisLabelFontFace: "Arial",
			catAxisLabelFontSize: 10,
			catAxisOrientation: "minMax",
			//
			showLegend: true,
			legendPos: "b",
			//
			showTitle: true,
			titleFontFace: "Calibri Light",
			titleFontSize: 30,
			title: "Patient 1 n indicators , patient 2 n indicators",
			//
			valAxes: [
				{
					showValAxisTitle: true,
					valAxisTitle: "Percentages(%)",
					valAxisMinVal:0,
				
					valAxisMaxVal: 100,
					valAxisTitleColor: "1982c4",
					valAxisLabelColor: "1982c4",
					valGridLine: { style: "none" },
				},
				{
					showValAxisTitle: true,
					valAxisTitle: "Global Market Share (%)",
					valAxisMaxVal: 100,
					valAxisMinVal:0,
					valAxisHidden:true,
					
					valAxisTitleColor: "F38940",
					valAxisLabelColor: "F38940",
					valGridLine: { style: "none" },
				},
			],
			//
			catAxes: [{ catAxisTitle: "Year" }, { catAxisHidden: true }],
		}
		const firstgraph_types=[
			{
				type: pres.charts.BAR,
				data: arrDataRegions
				
			},
			{
				type: pres.charts.LINE,
				data: [
					{
						name: "",
						labels: ["ji","ji"],
						values: [75,75,75,75],
					},
				],
		
				options: { lineDash: "dash",chartColors: ["F38940"],lineDataSymbol: "none", secondaryValAxis: true, secondaryCatAxis: true },
			},
		];
		
		slide3.addChart(firstgraph_types, firstgraph_props);
		slide.addImage({   path: "/png/Slide1.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		const textOptions = {
			
			x: "5%", // Adjust the horizontal position as needed
			y: "40%", // Adjust the vertical position as needed
			w: "90%", // Adjust the width as needed
			h: "10%", // Adjust the height as needed
			align: "center",
			valign: "middle",
			fontSize: 40,
			bold:true,
			wrap:true,
			color:"035A87"
		  };
		slide.addText(`CLINICAL AUDIT RESULTS ${time}`,textOptions)
		  

		const comboProps = {
			x: 0, y: 0, w: "100%", h: "100%",
			
			chartArea: { fill: { color: "F1F1F1" } },
			barDir: "col",
			
			//
			catAxisLabelColor: "494949",
			catAxisLabelFontFace: "Arial",
			catAxisLabelFontSize: 10,
			catAxisOrientation: "minMax",
			//
			showLegend: true,
			legendPos: "b",
			
			//
			showTitle: true,
			titleFontFace: "Calibri Light",
			titleFontSize: 14,
			title: "Team Adherence to Audit Criteria",
			//
			valAxes: [
				{
					showValAxisTitle: false,
					valAxisTitle: "Percentages(%)",
					valAxisMaxVal: 100,
					valAxisMinVal:0,
					valAxisTitleColor: "1982c4",
					valAxisLabelColor: "1982c4",
					valGridLine: { style: "none" },
				},
				{
					showValAxisTitle: false,
					valAxes:false,
					showValue:false,
					valAxisHidden:true,
					valAxisTitle: "",
					valAxisMaxVal: 100,
					valAxisTitleColor: "F38940",
					showLabel:false,
					valAxisLabelColor: "F38940",
					valGridLine: { style: "none" },
				},
			],
			//
			catAxes: [{ catAxisTitle: "Year" }, { catAxisHidden: true }],
		};
		
		
		const comboTypes = [
			{
				type: pres.charts.BAR,
				data: chart2data,
				options:{
					
				}
				
			},
			{
				type: pres.charts.LINE,
				data: [
					{
						name: "",
						labels: EVSALES_LBLS,
						values: [75, 75, 75, 75, 75, 75,75,75],
						
					},
				],
		
				options: { lineDash: "dash",chartColors: ["F38940"],lineDataSymbol: "none",displayBlanksAs:true,lineSize:5, secondaryValAxis: true, secondaryCatAxis: true },
			},
		];

		const overalladherence_props={
			x: 0, y: 0, w: "100%", h: "100%",
			
			chartArea: { fill: { color: "F1F1F1" } },
			barDir: "col",
			
			//
			catAxisLabelColor: "494949",
			catAxisLabelFontFace: "Arial",
			catAxisLabelFontSize: 10,
			catAxisOrientation: "minMax",
			//
			showLegend: true,
			legendPos: "b",
			//
			showTitle: true,
			titleFontFace: "Calibri Light",
			titleFontSize: 14,
			title: "Overall Adherence to Date",
			//
			valAxes: [
				{
					showValAxisTitle: true,
					valAxisTitle: "Percentages(%)",
					valAxisMaxVal: 100,
					valAxisMinVal:0,
					valAxisTitleColor: "1982c4",
					valAxisLabelColor: "1982c4",
				},
				{
					showValAxisTitle: true,
					valAxisTitle: "",
					valAxisMaxVal: 100,
					valAxisMinVal:0,
					valAxisHidden:true,
					valAxisTitleColor: "F38940",
					valAxisLabelColor: "F38940",
					valGridLine: { style: "none" },
				},
			],
			//
			catAxes: [{ catAxisTitle: "Year" }, { catAxisHidden: true }],
		}
		const overalladherence_types=[
			{
				type: pres.charts.BAR,
				data: chartdata3
				
			},
			{
				type: pres.charts.LINE,
				data: [
					{
						name: "",
						labels: EVSALES_LBLS,
						values: [75, 75, 75, 75, 75, 75,75,75,75,75,75,75,75,75,75],
					},
				],
		
				options: { lineDash: "dash",chartColors: ["F38940"],lineDataSymbol: "none", secondaryValAxis: true, secondaryCatAxis: true },
			},
		];

		slide4.addChart(comboTypes, comboProps);
		slide5.addChart(overalladherence_types,overalladherence_props)
		
		slide6.addImage({   path: "/png/Slide5.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide1.addImage({   path: "/png/Slide6.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide2.addImage({   path: "/png/Slide7.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide3.addImage({   path: "/png/Slide8.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide4.addImage({   path: "/png/Slide9.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide5.addImage({   path: "/png/Slide10.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide6.addImage({   path: "/png/Slide11.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide7.addImage({   path: "/png/Slide12.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide8.addImage({   path: "/png/Slide13.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide9.addImage({   path: "/png/Slide14.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		recommendslide10.addImage({   path: "/png/Slide15.PNG", x: 0, y: 0, w: "100%", h: "100%" , objectName: "animated gif" });
		
		pres.writeFile({ fileName: `facility_${props.queryfacility}_time_${props.timepoint}` });
		 setpowerload(false)
		};
	  

	return (
		<div>
			{powerpointloading?<div>powerpointloading</div>:null}
			{alldata?.length==0?<div>does not exist </div>: <button className="inline-block rounded bg-orange-600 px-4 py-2 text-xs font-medium text-white hover:bg-orange-700" onClick={handleDownload}>Generate powerpoint for facility {props.facility} at timepoint {props.timepoint}</button>}
		 
		</div>
	  );

 }
 else{
	return (
		<div>
			
			
		</div>
	)
 }
}
