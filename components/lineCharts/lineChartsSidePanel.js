import {Slider} from "@nextui-org/react";
import { useDispatch, useSelector} from 'react-redux';
import { range } from '../rangeSlice';
import {
	max,
	min
} from "d3";

export default function LineChartsSidePanel(props) {
	console.log('props inside slider>>>', props)
	  const unfilteredDataMin = min(props.data, d => d.acres);
	console.log('unfilteredDataMin >>>', unfilteredDataMin)
	  const unfilteredDataMax = max(props.data, d => d.acres);
	console.log('unfilteredDataMax >>>', unfilteredDataMax)

	const dispatch = useDispatch();
	const selectedRange = useSelector(state => state.range);
	console.log('min >>>', selectedRange[0])
	console.log('max >>>', selectedRange[1])
  return (
	  <div className="pl-12">
		  <Slider 
			  label="Acre Range"
			  step={0.1}
			  minValue={unfilteredDataMin}
			  maxValue={unfilteredDataMax}
			  defaultValue={[selectedRange[0], selectedRange[1]]}
			  className="max-w-md"
			  onChangeEnd={(value) => dispatch(range(value))}
	  />
	  </div>
  );
}

