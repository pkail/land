import { useState, useEffect, useMemo } from "react";
import { values }  from "../components/lineCharts/barChartsData";
import Layout from '../components/Layout';
import LineChartsSvg from "../components/lineCharts/lineChartsSvg";

const LineCharts = ({barChartsData = values}) =>  {

	return (
		<Layout title="Cost per Acre" >
	  Cost per Acre

		 <LineChartsSvg  data ={values} />
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

