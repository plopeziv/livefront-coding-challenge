import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { TableResultDTO } from "../types/table-team.dto";
import { SortingState } from "../types/table-sorting";
import { useState } from "react";

const columnHelper = createColumnHelper<TableResultDTO>();

const tableHeaders = [
  columnHelper.accessor("position", {
    header: "Position",
    sortingFn: "basic",
    invertSorting: true,
  }),
  columnHelper.accessor("name", { header: "Name", sortingFn: "text" }),
  columnHelper.accessor("playedGames", {
    header: "Played Games",
    sortingFn: "basic",
  }),
  columnHelper.accessor("won", { header: "Won", sortingFn: "basic" }),
  columnHelper.accessor("draw", { header: "Draw", sortingFn: "basic" }),
  columnHelper.accessor("lost", { header: "Lost", sortingFn: "basic" }),
  columnHelper.accessor("goalsFor", {
    header: "Goals For",
    sortingFn: "basic",
  }),
  columnHelper.accessor("goalsAgainst", {
    header: "Goals Against",
    sortingFn: "basic",
  }),
  columnHelper.accessor("goalDifference", {
    header: "+ -",
    sortingFn: "basic",
  }),
  columnHelper.accessor("points", { header: "Points", sortingFn: "basic" }),
];

export default function StandingsTable(props) {
  const router = useRouter();
  const rowData = props.rowData;
  const [sorting, setSorting] = useState<SortingState>([
    { id: "position", desc: true },
  ]);

  const emptyRows = 20 - rowData.length;

  const handleClick = (teamName: string) => {
    router.push(`/scoring_leaders/${slugify(teamName)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, teamName: string) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(teamName);
    }
  };

  const slugify = (text: string) => {
    return text.replace(/\s+/g, "_");
  };

  const standingsTable = useReactTable({
    data: rowData,
    columns: tableHeaders,
    state: { sorting },
    enableMultiSort: false,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className='text-center text-base w-[1100px]'>
      <caption id='table-caption' className='sr-only'>
        Premier League Table displaying team positions, played games, wins,
        draws, losses, goals, and points.
      </caption>

      <thead className='bg-[#2b2d42]'>
        {standingsTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                role='columnheader'
                scope='col'
                tabIndex={0}
                className='px-1 min-w-[90px] cursor-pointer'
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

      <tbody className='bg-[rgba(141,153,174,0.88)] '>
        {standingsTable.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            tabIndex={0}
            role='row'
            aria-label={`Row ${row.original.name} with ${row.original.points} points`}
            onClick={() => handleClick(row.original.name)}
            onKeyDown={(e) => handleKeyDown(e, row.original.name)}
            className={`${
              index % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)] h-[30px] cursor-default`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-1'>
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
            <td colSpan={10} className='h-[30px]'></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
