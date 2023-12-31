import { CSSProperties } from 'react';
import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';
import { range } from '../rangeSlice';
import { acreData } from '../acreSlice';
console.log('acreData >>>', acreData)
import { store } from '../store';
import { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state'


export default function CSVReader() {
  const { CSVReader } = useCSVReader();
	const dispatch = useDispatch();
    const [csvData, setcsvData] = useLocalStorageState('csvData', {
        defaultValue: []
    })
  return (
	  <>
		  <CSVReader
	  onUploadAccepted={(results) => {
		  const dataJSON = new Array(results.data.length);
		  console.log('dataJSON new array >>>', dataJSON)
		  var i, j;
		  for (i=0, j=7; i < results.data.length; i++, j--)
		  {
			  // dataJSON.unshift({address: 0, city: 0, state: 0, zip: 0, price: 0, acreage: 0, cost: 0, url: 0});
			  const obj = {ADDRESS:results.data[i][0],
				  CITY: results.data[i][1],
				  STATE: results.data[i][2],
				  ZIP: results.data[i][3],
				  PRICE: results.data[i][4],
				  ACREAGE: results.data[i][5],
				  COST: results.data[i][6],
				  URL: results.data[i][7]}

			  dataJSON.unshift(obj);
		  }
		  const acreValues = dataJSON.slice(1, results.data.length);
		  acreValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
		  acreValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
		  acreValues.forEach((item) => item.acres = item.ACREAGE);
		  acreValues.forEach((item) => item.cost = item.cost/item.acres);
		  setcsvData(acreValues);
		  dispatch(acreData(acreValues));
			  }}
			  config={{header: false }}
		  >
		{({
			getRootProps,
			acceptedFile,
			ProgressBar,
			getRemoveFileProps,
		}) => (
			  <>
				  <div style = {{display: 'flex', flexDirection: 'row', paddingLeft: 20, paddingTop: 100, paddingBottom: 400}}>
					  <button type='button' style={{width: '20%', color: 'white', backgroundColor: 'green'}} {...getRootProps()} >
					  Browse file
					  </button>
					  <div style={{border: '1px solid #ccc', height: 45, lineHeight: 2.5, paddingLeft: 10, width: '30%'}}>
					  {acceptedFile && acceptedFile.name}
					  </div>
					  <button  style={{ borderRadius: 0, padding: '0 20px', backgroundColor: 'red', color: 'white'}}	{...getRemoveFileProps()} >
					  Remove
					  </button>
				  </div>
			  <ProgressBar  style={{backgroundColor: 'yellow'}} />
			</>
			  )}
	  </CSVReader>
	  </>
  );
}
// columns: ["ADDRESS", "CITY", "STATE", "ZIP", "PRICE", "ACREAGE", "$/ACRE", "URL"}
