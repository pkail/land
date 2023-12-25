import {Slider} from "@nextui-org/react";
import { useDispatch, useSelector} from 'react-redux';
import { range } from '../rangeSlice';
import { outlier } from '../outlierSlice';
import {Chip} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {
	max,
	min,
	median,
	mean
} from "d3";
import { regressionLinear } from "d3-regression";

export default function LineChartsSidePanel(props) {
	  const tripleFilteredMin = min(props.tripleFilteredData, d => d.cost);
	  const tripleFilteredMax = max(props.tripleFilteredData, d => d.cost);
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
	 <Chip color="primary" size='lg'>Median: {medianCost}</Chip>
	 <Chip color="danger" size='lg'>Mean: {meanCost}</Chip>
	 <Chip color="secondary" size='lg'>Lowest: {tripleFilteredMin}</Chip>
	 <Chip color="secondary" size='lg'>Highest: {tripleFilteredMax}</Chip>
	 <Chip color="secondary" size='lg'>Regression y = {Math.trunc(res.a)}x+{Math.trunc(res.b)}</Chip>
	 {/* <Chip color="secondary" size='lg'>Regression b: {Math.trunc(res.b)}</Chip> */}
    </div>

<Input
          type="number"
          label="Price"
          placeholder="0.00"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
    </div>
  );
}

