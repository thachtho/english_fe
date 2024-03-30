import { Table, flexRender } from "@tanstack/react-table"
import Filter from "./Filter"

export interface ITable {
    table: Table<any>
}
function TableList({
    table
}: ITable) {
    console.log(12321321, table)
  return (
    <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
                return (
                <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                    <>
                        <div
                        {...{
                            className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                            onClick: header.column.getToggleSortingHandler(),
                        }}
                        >
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                        <div>
                            <Filter column={header.column} table={table} />
                        </div>
                        ) : null}
                    </>
                    )}
                </th>
                )
            })}
            </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => {
            return (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                return (
                    <td key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                    </td>
                )
                })}
            </tr>
            )
        })}
        </tbody>
    </table>
  )
}

export default TableList
