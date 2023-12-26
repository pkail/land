import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, RadioGroup, Radio} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { acreFilter } from '../acreSlice';
import sortBy from 'lodash/sortBy';
import Router from 'next/router'
import { useState, useCallback } from 'react';
import {Card, CardBody, Button } from "@nextui-org/react";
import {Link} from "@nextui-org/react";

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
	console.log('props >>>', props)
	console.log('props.data >>>', props.data)
	const dispatch = useDispatch();
 const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "URL":
        return (
			<Link href={cellValue} target="_blank">{cellValue}</Link>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
		  <Table
			color = 'green'
			aria-label="Data Grid"
			selectionMode="single"
			onRowAction={(key) => dispatch(acreFilter(key))}
			selectionBehavior="replace">
			  <TableHeader columns={columns}>
				  {(column) => <TableColumn key={column.key} allowsSorting >{column.label}</TableColumn>}
			  </TableHeader>
			  <TableBody items={props.data}>
	  {(item) => (
				  <TableRow key={item.key}>
				  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
		  </TableRow>
			  )}
				  </TableBody>
	  </Table>
  );
}
