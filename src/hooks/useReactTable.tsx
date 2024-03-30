import { rankItem } from "@tanstack/match-sorter-utils";
import { ColumnFiltersState, FilterFn, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";

function UseReactTable({
  columns,
  data
}: {
  columns: any,
  data: any
}) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState('')
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value)
        addMeta({
          itemRank,
        })
        return itemRank.passed
      }

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


    return {
        table,
    }
}

export default UseReactTable
