import { useState } from "react";
import PptxGenJS from "pptxgenjs";
import pptxgen from "pptxgenjs";

export default function PowerPointSlide(props) {
	console.log
	
 if (props.data){
	const [slideData, setSlideData] = useState({});
	const [validdata,isData]=useState()
		let barchartpatient1data=props?.data.allmonths_result
		console.log(barchartpatient1data)
		
		//i need it in the form of two objects with the value field name , names and labels
		function convertbarchartdata(barchartpatient1data){
		  var a= barchartpatient1data.map((monthdata)=>{
			  return monthdata[0]*100
		  })
		  var b = barchartpatient1data.map((monthdata)=>{
			  return monthdata[1]*100
		  })
		  const firstpatient=	{
			  name: "patient 1",
			  labels: ["1", "2", "3", "4","5","6","7","8","9","10"],
			  values: a
		  }
		  const secondpatient=	{
			  name: "patient 2",
			  labels: ["1", "2", "3", "4","5","6","7","8","9","10"],
			  values: b
		  }
		  const master=[firstpatient,secondpatient]
	  return master
		}
		 const COLOR_RED = "FF0000";
		 const COLOR_YLW = "F2AF00";
		 const COLOR_GRN = "7AB800";
		 const COLOR_UNK = "A9A9A9";
		 const COLOR_COMP = "4472C4";
		 const COLOR_CANC = "672C7E";
		 const COLORS_RYGU = [COLOR_RED, COLOR_YLW];
		 const dataChartPieStat = [
		  {
			name: "first patient percentage completion",
			labels: ["Red", "Yellow"],
			values: [props.data.currentmonth_results[0]*100, 100-[props.data.currentmonth_results[0]*100]],
		  },
		];
		const dataChartPieStat_patient2 = [
		  {
			name: "second patient percentage completion",
			labels: ["Blue", "Yellow"],
			values: [props.data.currentmonth_results[1]*100, 100-[props.data.currentmonth_results[1]*100]],
		  },
		];
		 const handleDownload = () => {
		  let pres = new pptxgen();
		  let dataChartAreaLine = [
			{
			  name: "Actual Sales",
			  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			  values: [1500, 4600, 5156, 3167, 8510, 8009, 6006, 7855, 12102, 12789, 10123, 15121],
			},
			{
			  name: "Projected Sales",
			  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			  values: [1000, 2600, 3456, 4567, 5010, 6009, 7006, 8855, 9102, 10789, 11123, 12121],
			},
		  ];
	  
		 
	   var  slide=pres.addSlide()
		var slide2=pres.addSlide()
		var slide3 =pres.addSlide()
		slide2.addChart(pres.charts.PIE, dataChartPieStat, {
			  x: 0.5,
			  y: 0.6,
			  w: 6.0,
			  h: 6.0,
		  title:"hi",
			  chartArea: { fill: { color: "F1F1F1" } },
			  chartColors: COLORS_RYGU,
			  dataBorder: { pt: 2, color: "F1F1F1" },
			  //
			  legendPos: "l",
			  legendFontFace: "Courier New",
			  showLegend: true,
		  showTitle:true,
			  //
			  showLeaderLines: true,
			  showPercent: false,
			  showValue: true,
			  dataLabelColor: "FFFFFF",
			  dataLabelFontSize: 14,
			  dataLabelPosition: "bestFit", // 'bestFit' | 'outEnd' | 'inEnd' | 'ctr'
		  });
		slide2.addChart(pres.charts.PIE, dataChartPieStat_patient2, {
			  x: 6.83,
			  y: '100%',
			  w: 4.0,
			  h: 4,
		  title:"hi",
			  chartArea: { fill: { color: "F1F1F1" } },
			  chartColors: COLORS_RYGU,
			  dataBorder: { pt: 2, color: "F1F1F1" },
			  //
			  legendPos: "l",
			  legendFontFace: "Courier New",
			  showLegend: true,
		  showTitle:true,
			  //
			  showLeaderLines: true,
			  showPercent: false,
			  showValue: true,
			  dataLabelColor: "FFFFFF",
			  dataLabelFontSize: 14,
			  dataLabelPosition: "bestFit", // 'bestFit' | 'outEnd' | 'inEnd' | 'ctr'
		  });
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
		let arrDataRegions = convertbarchartdata(barchartpatient1data)
		  slide3.addChart(pres.charts.BAR, arrDataRegions, optsChartBar2);
		
	  
	  
		  slide.addChart(pres.ChartType.line, dataChartAreaLine, { x: 1, y: 1, w: 8, h: 4 });
		 pres.writeFile({ fileName: `facility_${props.queryfacility}_time_${props.timepoint}` });
		 
		};
	  

	return (
		<div>
			{barchartpatient1data.length==0?<div>does not exist </div>: <button onClick={handleDownload}>Generate powerpoint for facility {props.facility} at timepoint {props.timepoint}</button>}
		 
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
