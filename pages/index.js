import { useState, useEffect, useMemo } from "react";
import { acreValues }  from "../components/lineCharts/acreData";
import { range } from '../components/rangeSlice';
import Layout from '../components/Layout';
import LineChartsSvg from "../components/lineCharts/lineChartsSvg";
import LineChartsSidePanel from "../components/lineCharts/lineChartsSidePanel";
// import FileUpload from "../components/fileUpload/fileUpload";
import CSVReader from "../components/fileUpload/csvReader";
import DataGrid from "../components/dataGrid/dataGrid";
import { useSelector, useDispatch } from 'react-redux';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import {
	mean,
	median,
	max,
	min,
	deviation
} from "d3";

const LineCharts = () =>  {

	const unfilteredData = useSelector(state => state.acre);
	console.log('unfilteredData in index >>>', unfilteredData)
	const selectedRange = useSelector(state => state.range);
	console.log('selectedRange in index >>>', selectedRange)
	const filteredData = unfilteredData.filter(item => item.acres > selectedRange[0]);
	const doubleFilteredData = filteredData.filter(item => item.acres < selectedRange[1]);
	console.log('doubleFilteredData in index >>>', doubleFilteredData)

// Filter by difference from mean
	const dataSD = deviation(unfilteredData, d => d.cost);
	console.log('dataSD >>>', dataSD)
const dataMean = mean(unfilteredData, d => d.cost);
	console.log('dataMean >>>', dataMean)

	// const dispatch = useDispatch();
	//   const unfilteredMin = min(unfilteredData, d => d.acres);
	//   const unfilteredMax = max(unfilteredData, d => d.acres);
	// dispatch(range([unfilteredMin, unfilteredMax]));

const outlier = useSelector(state => state.outlier);
const tripleFilteredData = doubleFilteredData.filter(item => item.cost < dataMean+(dataSD*outlier));
	console.log('tripleFilteredData in index >>>', tripleFilteredData)

	return (
		<Layout title="Cost per Acre" >
    <div className="flex w-full flex-col">
		<div className='text-5xl py-4' > Cost Calculator: $ per Acre</div>
      <Tabs aria-label ="Options"
	  			variant = "underlined">
        <Tab
			key="Scatter Graph" title="Scatter Graph">
          <Card>
				  <CardBody >
				  <LineChartsSvg  tripleFilteredData = {tripleFilteredData} />
						  </CardBody>
			  </Card>
					  <Card>
						  <CardBody >
						  <LineChartsSidePanel tripleFilteredData = {tripleFilteredData} unfilteredData = {unfilteredData} />
						  </CardBody>
					  </Card>
        </Tab>
        <Tab key="Data Grid" title="Data Grid">
          <Card>
            <CardBody>
				<DataGrid data= {unfilteredData} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="File Upload" title="File Upload">
          <Card>
            <CardBody>
				<CSVReader />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
		</Layout>
  );
}

export default LineCharts;

// export async function getStaticProps(){
// const res = await sql `SELECT * FROM barcharts ORDER BY year;`
// 	return {
// 		props: {...await serverSideTranslations('en', ['common']),
// 			barChartsData: res}
// }
// }

