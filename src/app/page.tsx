"use client";

import { useEffect, useState } from "react";
import StandingsTable from "./components/StandingsTable";

export default function Home() {
  const [rowData, setRowData] = useState([]);

  const colNames = [
    { field: "Position" },
    { field: "Name" },
    { field: "Played Games" },
    { field: "Won" },
    { field: "Draw" },
    { field: "Lost" },
    { field: "Goals For" },
    { field: "Goals Against" },
    { field: "+ -" },
    { field: "Points" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await fetch("/api/standings");

        const jsonData = await fetchResponse.json();
        if (jsonData.standings) {
          const extractedData = jsonData.standings[0].table.map((item) => ({
            ...item,
            name: item.team.name,
          }));
          setRowData(extractedData);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-5xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'>
        Premier League Table
      </h1>
      <StandingsTable headers={colNames} rowData={rowData} />
    </div>
  );
}
