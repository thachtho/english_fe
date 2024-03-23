import React, { useState } from 'react'
import './index.scss'

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingFn,
  sortingFns,
  useReactTable
} from '@tanstack/react-table'

import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils'
import { DeleteIcon, EditIcon } from '../../../components'
import Breadcrumb from '../../../components/Breadcrumb'
import Panigation from '../../../components/React-table/Panigation'
import TableList from '../../../components/React-table/Table'
import Button from '../../../components/UiElements/Button'
import { makeData, Person } from './makeData'
import { useNavigate } from 'react-router-dom'
import AddTeacher from './AddTeacher'
import BaseLayoutContent from '../../../components/Layout/BaseLayoutContent'

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

function Teacher() {
  const navigation = useNavigate();
  const rerender = React.useReducer(() => ({}), {})[1]
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
        {
          accessorKey: 'firstName',
            cell: info => info.getValue(),
            header: () => <span>STT</span>,
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Họ và tên</span>,
            footer: props => props.column.id,
          },
          {
            accessorFn: row => `${row.firstName} ${row.lastName}`,
            id: 'fullName',
            header: 'Nickname',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            header: 'Action',
            cell: (row) => (
              <div className='flex justify-center'>
                <Button handleClick={() => console.log(333333, row)} className='pr-5'>
                  <EditIcon />
                </Button>
                <Button handleClick={() => console.log(333333, row)} className='pr-5'>
                  <DeleteIcon width={20} height={20}/>
                </Button>
                <Button handleClick={() => alert(1)} className='text-meta-5' text={'Chi tiết'}/>
              </div>

            ),
          },
    ],
    []
  )

  const [data, setData] = React.useState<Person[]>(() => {
    return makeData(1000)
  })
//   const refreshData = () => setData(_old => makeData(50000))

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  const handleAddTeacher = () => {
    setIsModalOpen(true);
  }

  return (
    <>
        <Breadcrumb pageName="Danh sách giáo viên" />
        <Button 
          className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 cursor-pointer m-2'
          handleClick={handleAddTeacher}
          text='Add' 
        />
        <Button 
          className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 cursor-pointer'
          handleClick={handleAddTeacher}
          text='Import excel' 
        />
        <BaseLayoutContent>
          <div className='teacher'>
            <TableList table={table}/>
            <div className="h-2" />
            <Panigation table={table} />                
          </div>
        </BaseLayoutContent>
        <AddTeacher 
          setIsModalOpen={setIsModalOpen} 
          isModalOpen={isModalOpen}
        />
    </>
  )
}

export default Teacher;
