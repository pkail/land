import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, RadioGroup, Radio} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { acreFilter } from '../acreSlice';

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];
const columns = [
  {
    key: "acres",
    label: "Acres",
  },
  {
    key: "cost",
    label: "Cost",
  }
];

export default function DataGrid(props) {
	console.log('props >>>', props)
	console.log('props.data >>>', props.data)
const acre = useSelector(state => state.acre);
	console.log('acre in datagrid ', acre)
	const dispatch = useDispatch();

  return (
		  <Table
			color = 'green'
			onRowAction={(key) => dispatch(acreFilter(key))}
			selectionMode="multiple"
			selectionBehavior="replace">
			  <TableHeader columns={columns}>
			  {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			  </TableHeader>
			  <TableBody items={props.data}>
	  {(item) => (
				  <TableRow key={item.key}>
				  {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
		  </TableRow>
			  )}
				  </TableBody>
	  </Table>
  );
}
