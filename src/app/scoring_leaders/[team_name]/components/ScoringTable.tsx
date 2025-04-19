import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ScoringPlayerDTO } from "../types/scoring-player.dto";
import { SortingState } from "../../../types/table-sorting";

const columnHelper = createColumnHelper<ScoringPlayerDTO>();

const tableHeaders = [
  columnHelper.accessor("name", {
    header: "Name",
    sortingFn: "text",
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "Date of Birth",
    sortingFn: "datetime",
  }),
  columnHelper.accessor("nationality", {
    header: "Nationality",
    sortingFn: "text",
  }),
  columnHelper.accessor("position", {
    header: "Position",
    sortingFn: "text",
  }),
  columnHelper.accessor("goals", {
    header: "Goals",
    sortingFn: "basic",
    sortUndefined: 1,
  }),
  columnHelper.accessor("assists", {
    header: "Assists",
    sortingFn: "basic",
    sortUndefined: 1,
  }),
  columnHelper.accessor("matches", {
    header: "Matches",
    sortingFn: "basic",
    sortUndefined: 1,
  }),
];

export default function ScoringTable(props) {
  const rowData: ScoringPlayerDTO[] = props.rowData;
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "goals",
      desc: true,
    },
  ]);

  let emptyRows = 12;
  if (rowData?.length) {
    emptyRows = 12 - rowData.length;
  }
  const scoringTable = useReactTable({
    data: rowData,
    columns: tableHeaders,
    state: { sorting },
    enableMultiSort: false,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className='text-center text-base w-[800px]'>
      <caption id='scoring-table-caption' className='sr-only'>
        Scoring table displaying player information, including name, date of
        birth, nationality, position, goals, assists, and matches played.
      </caption>

      <thead className='bg-[#2b2d42]'>
        {scoringTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                role='columnheader'
                scope='col'
                tabIndex={0}
                className='px-3 min-w-[90px] cursor-pointer'
                onClick={header.column.getToggleSortingHandler()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    header.column.getToggleSortingHandler()(e);
                  }
                }}
                aria-sort={
                  header.column.getIsSorted()
                    ? header.column.getIsSorted() === "desc"
                      ? "descending"
                      : "ascending"
                    : "none"
                }
              >
                {header.isPlaceholder ? null : (
                  <div className='flex items-center justify-center gap-1'>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span aria-hidden='true'>
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? ""}
                    </span>
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='bg-[rgba(141,153,174,0.88)]'>
        {scoringTable.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            tabIndex={0}
            role='row'
            className={`${
              index % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)] h-[30px] cursor-default`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-2'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}

        {Array.from({ length: emptyRows }).map((_, idx) => (
          <tr
            key={`empty-${idx}`}
            className={`${
              idx % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)]`}
          >
            <td colSpan={7} className='h-[30px]'></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
