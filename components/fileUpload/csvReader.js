import { CSSProperties } from 'react';
import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';
import { addData } from '../addDataSlice';
import { acre } from '../acreSlice';
import { range } from '../rangeSlice';
import { store } from '../store';
import useLocalStorageState from 'use-local-storage-state'

// const dispatch = useDispatch();

	// const convertToJSON = (results) =>
// {
// const data = dataJSON.slice(1, results.data.length);
// console.log('results.data.length >>>', results.data.length)
// console.log('data >>>', data)
// }


export default function CSVReader() {
console.log('addData >>>', addData)
console.log('range >>>', range)
console.log('acre >>>', acre)
  const { CSVReader } = useCSVReader();
    const [csvData, setcsvData] = useLocalStorageState('csvData', {
        defaultValue: []
    })
  return (
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
console.log('dataJSON before slice >>>', dataJSON)
const acreValues = dataJSON.slice(1, results.data.length);
console.log('results.data.length >>>', results.data.length)
	acreValues.forEach((item) => item.cost = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/(item.ACREAGE * 100)));
	acreValues.forEach((item) => item.price = Math.trunc(parseInt(item.PRICE.replace(/[^0-9]/g, ""))/100));
	acreValues.forEach((item) => item.acres = item.ACREAGE);
console.log('acreValues after last foreach >>>', acreValues)
	acreValues.forEach((item) => item.cost = item.cost/item.acres);
console.log('acreValues at end >>>', acreValues)
console.log('addData in callback >>>', addData)
console.log('acre in callback >>>', acre)
setcsvData(acreValues);
      }}
		config={{ }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }) => (
        <>
          <div >
            <button type='button' {...getRootProps()} >
              Browse file
            </button>
            <div>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} >
              Remove
            </button>
          </div>
          <ProgressBar  />
        </>
      )}
    </CSVReader>
  );
}
// columns: ["ADDRESS", "CITY", "STATE", "ZIP", "PRICE", "ACREAGE", "$/ACRE", "URL"}
