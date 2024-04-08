import React, { useState } from 'react'

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
  useReactTable
} from '@tanstack/react-table'

import {
  RankingInfo,
  rankItem
} from '@tanstack/match-sorter-utils'
import { DeleteIcon, EditIcon } from '../../../components'
import HeaderAddElementComponent from '../../../components/HeaderAddElementComponent'
import Panigation from '../../../components/React-table/Panigation'
import TableList from '../../../components/React-table/Table'
import Button from '../../../components/UiElements/Button'
import useLoader from '../../../hooks/useLoader'
import BaseLayoutContent from '../../../layout/BaseLayoutContent'
import AddTeacher from './AddTeacher'
import useTeacher from './hooks/useTeacher'
import useAddTab from '../../../hooks/useAddTab'

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

function Teacher() {
  const { loading } = useLoader()
  useAddTab();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
        {
            id: 'id',
            cell: row => row.row.index + 1,
            header: () => <span>STT</span>,
            footer: props => props.column.id,
          },  
          {
            accessorFn: row => row.nickname,
            id: 'nickname',
            cell: info => info.getValue(),
            header: () => <span>Nickname</span>,
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.fullname,
            id: 'fullname',
            header: 'Họ và tên',
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
  const { teachers, getDataTeacher } = useTeacher();
  const table = useReactTable({
    data: teachers,
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
      <HeaderAddElementComponent 
          handleAdd={handleAddTeacher}
          handleImportExcell={handleAddTeacher}
      />  
      <BaseLayoutContent
        data={teachers}
        loading={loading}
        message='Chưa có giáo viên nào'
      >
        <div className='react-table'>
          <TableList table={table}/>
          <div className="h-2" />
          <Panigation table={table} />                
        </div>
      </BaseLayoutContent>
      {isModalOpen &&
        <AddTeacher 
          setIsModalOpen={setIsModalOpen} 
          isModalOpen={isModalOpen}
          getDataTeacher={getDataTeacher}
        />
      }
    </>
  )
}

export default Teacher;
