import {Slider} from "@nextui-org/react";
import { useDispatch, useSelector} from 'react-redux';
import { range } from '../rangeSlice';
import { outlier } from '../outlierSlice';
import {Chip} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {
	max,
	min,
	median,
	mean
} from "d3";
import { regressionLinear } from "d3-regression";
import {format} from 'd3-format';

export default function LineChartsSidePanel(props) {
	  const doubleFilteredMin = min(props.doubleFilteredData, d => d.cost);
	  const doubleFilteredMax = max(props.doubleFilteredData, d => d.cost);
	  const unfilteredMin = min(props.unfilteredData, d => d.acres);
	  const unfilteredMax = max(props.unfilteredData, d => d.acres);

	const dispatch = useDispatch();
	const selectedRange = useSelector(state => state.range);
	  const medianCost = median(props.doubleFilteredData, d => d.cost);
	  const meanCost = Math.trunc(mean(props.doubleFilteredData, d => d.cost));
	  const numberItems = props.doubleFilteredData.length;


const regression = regressionLinear()
					.x(d => d.acres)
					.y(d => d.cost);
const res = regression(props.doubleFilteredData);


  return (
<div className="pl-40">
	<Card>
		<CardBody>
			<Slider
				label="Acre Range"
				showTooltip={true}
				size="lg"
				step={0.1}
				minValue={unfilteredMin}
				maxValue={unfilteredMax}
				defaultValue={[selectedRange[0], selectedRange[1]]}
				defaultValue={[unfilteredMin, unfilteredMax]}
				className="max-w-6xl"
				onChangeEnd={(value) => dispatch(range(value))}
			/>
		</CardBody>
	</Card>
			<Card>
			<CardBody>
				<div className="flex gap-4 py-8">
				<Chip color="success" size='lg'>Number of Items: {numberItems}</Chip>
				<Chip color="primary" size='lg'>Median: ${format(",")(medianCost)}</Chip>
				<Chip color="danger" size='lg'>Mean: ${format(",")(meanCost)}</Chip>
				<Chip color="secondary" size='lg'>Lowest: ${format(",")(doubleFilteredMin)}</Chip>
				<Chip color="secondary" size='lg'>Highest: ${format(",")(doubleFilteredMax)}</Chip>
				<Chip color="secondary" size='lg'>Regression y = {Math.trunc(res.a)}x+{Math.trunc(res.b)}</Chip>
				</div>
</CardBody>
			</Card>
    </div>
  );
}

