import { useState, useEffect, useMemo } from "react";
import { values }  from "../components/lineCharts/barChartsData";
import Layout from '../components/Layout';
import LineChartsSvg from "../components/lineCharts/lineChartsSvg";
import DataGrid from "../components/dataGrid/dataGrid";

const LineCharts = ({barChartsData = values}) =>  {

	return (
		<Layout title="Cost per Acre" >
			<div className='flex flex-col space-y-20'>
			<div className='text-5xl'> Cost per Acre</div>

			<LineChartsSvg  data = {values} />
			<DataGrid data= {values} />
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

