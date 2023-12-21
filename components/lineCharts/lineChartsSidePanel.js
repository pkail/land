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
	  const tripleFilteredMin = min(props.tripleFilteredData, d => d.acres);
	  const tripleFilteredMax = max(props.tripleFilteredData, d => d.acres);
	  const unfilteredMin = min(props.unfilteredData, d => d.acres);
	  const unfilteredMax = max(props.unfilteredData, d => d.acres);

	const dispatch = useDispatch();
	const selectedRange = useSelector(state => state.range);
	  const medianCost = median(props.tripleFilteredData, d => d.cost);
	  const meanCost = Math.trunc(mean(props.tripleFilteredData, d => d.cost));
	  const numberItems = props.tripleFilteredData.length;


const regression = regressionLinear()
					.x(d => d.acres)
					.y(d => d.cost);
const res = regression(props.tripleFilteredData);


  return (
<div className="pl-12y">
	<div className="pl-12 py-8">
	<Slider
		label="Acre Range"
		step={0.1}
		minValue={unfilteredMin}
		maxValue={unfilteredMax}
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
	</div>
<div className="flex gap-4 py-4">
	 <Chip color="success" size='lg'>Number of Items: {numberItems}</Chip>
	 <Chip color="danger" size='lg'>Median: {medianCost}</Chip>
	 <Chip color="primary" size='lg'>Mean: {meanCost}</Chip>
	 <Chip color="secondary" size='lg'>Lowest: {tripleFilteredMin}</Chip>
	 <Chip color="secondary" size='lg'>Highest: {tripleFilteredMax}</Chip>
	 <Chip color="secondary" size='lg'>Regression a: {Math.trunc(res.a)}</Chip>
	 <Chip color="secondary" size='lg'>Regression b: {Math.trunc(res.b)}</Chip>
    </div>
    </div>
  );
}

