"use client";

import { useEffect, useState } from "react";
import StandingsTable from "./components/StandingsTable";

export default function Home() {
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-[url('/background_images/soccer_pitch.jpg')] bg-cover bg-center">
        {!loading && <StandingsTable headers={colNames} rowData={rowData} />}
      </div>
    </main>
  );
}
