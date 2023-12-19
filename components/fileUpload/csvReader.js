import { CSSProperties } from 'react';
import { useCSVReader } from 'react-papaparse';
import { useDispatch } from 'react-redux';
import { acreFilter } from '../acreSlice';

export default function CSVReader() {
  const { CSVReader } = useCSVReader();
	const dispatch = useDispatch();

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        console.log(results);
		dispatch(acreFilter(results))
      }}
		config={{delimiter: ",", header: false}}
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
