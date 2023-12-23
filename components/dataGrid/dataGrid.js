import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, RadioGroup, Radio} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { acreFilter } from '../acreSlice';

const columns = [
  {
    key: "acres",
    label: "Acres",
  },
  {
    key: "price",
    label: "Cost",
  },
  {
    key: "cost",
    label: "Cost/acre",
  },
{
    key: "ADDRESS",
    label: "Address",
  },
{
    key: "CITY",
    label: "City",
  },
{
    key: "STATE",
    label: "State",
  },
{
    key: "ZIP",
    label: "ZIP",
  },
{
    key: "URL",
    label: "URL",
  }
];

export default function DataGrid(props) {
const acre = useSelector(state => state.acre);
	console.log('acre in datagrid >>>', acre)
	const dispatch = useDispatch();

  return (
		  <Table
			color = 'green'
			aria-label="Data Grid"
			onRowAction={(key) => dispatch(acreFilter(key))}
			selectionMode="multiple"
			selectionBehavior="replace">
			  <TableHeader columns={columns}>
				  {(column) => <TableColumn key={column.key} >{column.label}</TableColumn>}
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
