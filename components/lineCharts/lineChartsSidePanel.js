import {Slider} from "@nextui-org/react";
import { useDispatch, useSelector} from 'react-redux';
import { range } from '../rangeSlice';

export default function LineChartsSidePanel(props) {
	console.log('props inside slider>>>', props)
	const dispatch = useDispatch();
	const selectedRange = useSelector(state => state.range);
	console.log('min >>>', selectedRange[0])
	console.log('max >>>', selectedRange[1])
  return (
    <Slider 
      label="Acre Range"
      step={0.1}
      minValue={0}
      maxValue={100}
      defaultValue={[selectedRange[0], selectedRange[1]]}
      className="max-w-md"
	  onChangeEnd={(value) => dispatch(range(value))}
    />
  );
}

