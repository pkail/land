import {Slider} from "@nextui-org/react";
import { useDispatch, useSelector} from 'react-redux';
import { range } from '../rangeSlice';
import { outlier } from '../outlierSlice';
import {Chip} from "@nextui-org/react";
import {
	max,
	min,
	median,
	mean
} from "d3";
import { regressionLinear } from "d3-regression";

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
	  const medianCost = median(props.data, d => d.cost);
	  const meanCost = Math.trunc(mean(props.data, d => d.cost));


const regression = regressionLinear()
					.x(d => d.acres)
					.y(d => d.cost);
const res = regression(props.data);


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
		  <Slider
			  label="Outliers"
			  step={0.1}
			  minValue={0}
			  maxValue={3}
			  defaultValue={3}
			  className="max-w-md"
			  onChangeEnd={(value) => dispatch(outlier(value))}
	  />
 <div className="flex gap-4 py-8">
	 <Chip color="primary">Median: {medianCost}</Chip>
	 <Chip color="warning">Mean: {meanCost}</Chip>
	 <Chip color="secondary">Min: {unfilteredDataMin}</Chip>
	 <Chip color="secondary">Max: {unfilteredDataMax}</Chip>
	 <Chip color="danger">Regression a: {Math.trunc(res.a)}</Chip>
	 <Chip color="danger">Regression b: {Math.trunc(res.b)}</Chip>
    </div>
	  </div>
  );
}

