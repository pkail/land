import { useState, useEffect, useMemo } from "react";
// import { values }  from "../components/lineCharts/barChartsData";
import Layout from '../components/Layout';
import LineChartsSvg from "../components/lineCharts/lineChartsSvg";
import DataGrid from "../components/dataGrid/dataGrid";
import { useSelector } from 'react-redux';

const LineCharts = () =>  {

	const data = useSelector(state => state.acre);
	console.log('data in index >>>', data)
	return (
		<Layout title="Cost per Acre" >
			<div className='flex flex-col space-y-20'>
			<div className='text-5xl'> Cost per Acre</div>

			<LineChartsSvg  data = {data} />
			<DataGrid data= {data} />
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

