import { CSSProperties } from 'react';
import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';
import { data } from '../dataSlice';
import { range } from '../rangeSlice';
import useLocalStorageState from 'use-local-storage-state'
console.log('range >>>', range)
console.log('data >>>', data)

// const dispatch = useDispatch();

	const convertToJSON = (results) =>
{
	const dataJSON = new Array(results.data.length);
	console.log('dataJSON new array >>>', dataJSON)
	var i, j;
	for (i=0, j=7; i < results.data.length; i++, j--)
	{
		// dataJSON.unshift({address: 0, city: 0, state: 0, zip: 0, price: 0, acreage: 0, cost: 0, url: 0});
		const obj = {address:results.data[i][0],
					city: results.data[i][1],
					state: results.data[i][2],
					zip: results.data[i][3],
					price: results.data[i][4],
					acreage: results.data[i][5],
					cost: results.data[i][6],
					url: results.data[i][7]}

		dataJSON.unshift(obj);
}
		console.log('dataJSON before slice >>>', dataJSON)
const data = dataJSON.slice(1, results.data.length);
console.log('results.data.length >>>', results.data.length)
console.log('data >>>', data)
}


export default function CSVReader() {
  const { CSVReader } = useCSVReader();
    const [csvData, setcsvData] = useLocalStorageState('csvData', {
        defaultValue: []
    })
  return (
    <CSVReader
      onUploadAccepted={(results) => {
	console.log('results.data', results.data);
		 setcsvData(results.data);
		 convertToJSON(results);
		// dispatch(csv(results.data))
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
