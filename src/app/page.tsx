"use client";

import { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import StandingsTable from "./components/StandingsTable";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const [standingsData, setStandingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([
    {
      position: 1,
      team: { name: "Real Madrid" },
      playedGames: 20,
      won: 10,
      draw: 4,
      lost: 6,
      goalsFor: 12,
      goalsAgainst: 2,
      goalDifference: 10,
      points: 34,
    },
  ]);

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
          console.log(extractedData);
          setRowData(extractedData);
        }
        setStandingsData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center bg-[url('/background_images/soccer_pitch.jpg')] bg-cover bg-center">
      <StandingsTable headers={colNames} rowData={rowData} />
    </div>
  );
}
