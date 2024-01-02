import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, RadioGroup, Radio} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { acreFilter } from '../acreSlice';
import sortBy from 'lodash/sortBy';
import Router from 'next/router'
import { useState, useCallback } from 'react';
import {Card, CardBody, Button } from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import {format} from 'd3-format';
import {useAsyncList} from 'react-stately'
import useLocalStorageState from 'use-local-storage-state'

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
	const [direction, setDirection] = useLocalStorageState('direction', {defaultValue: {column: "acres", direction: "ascending"}});
	const dispatch = useDispatch();
  let list = useAsyncList({
	   async load({signal}) {return {items: props.data}},
     async sort({items, sortDescriptor}) {
		 setDirection(sortDescriptor);
		console.log('direction >>>', direction)
      return {
        items: items.sort((a, b) => {
          let first = a[direction.column];
          let second = b[direction.column];
          let cmp = (first < second ? -1 : 1);

          if (direction.direction === "descending") {
            cmp *= -1;
          }

  return cmp;
        }),
      };
    },
  });

 const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "cost":
        return (
			<>
			${format(",")(cellValue)}
			</>
        );
      case "price":
        return (
			<>
			${format(",")(cellValue)}
			</>
        );
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
			onSortChange={list.sort}
			selectionMode="single"
			sortDescriptor={direction}
			onRowAction={(key) => dispatch(acreFilter(key))}
			selectionBehavior="replace">
			  <TableHeader columns={columns}>
				  {(column) => <TableColumn key={column.key} allowsSorting >{column.label}</TableColumn>}
			  </TableHeader>
			  <TableBody items={list.items}>
	  {(item) => (
				  <TableRow key={item.key}>
				  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
		  </TableRow>
			  )}
				  </TableBody>
	  </Table>
  );
}
