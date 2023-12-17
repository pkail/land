import { useState, useEffect, useMemo } from "react";
import { acreValues }  from "../components/lineCharts/acreData";
import Layout from '../components/Layout';
import LineChartsSvg from "../components/lineCharts/lineChartsSvg";
import LineChartsSidePanel from "../components/lineCharts/lineChartsSidePanel";
// import FileUpload from "../components/fileUpload/fileUpload";
import CSVReader from "../components/fileUpload/csvReader";
import DataGrid from "../components/dataGrid/dataGrid";
import { useSelector } from 'react-redux';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

const LineCharts = () =>  {

	const data = useSelector(state => state.acre);

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
				<LineChartsSvg  data = {data} />
				<LineChartsSidePanel data = {data} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Data Grid" title="Data Grid">
          <Card>
            <CardBody>
				<DataGrid data= {data} />
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

