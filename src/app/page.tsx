"use client";

import { useEffect, useState } from "react";
import StandingsTable from "./components/StandingsTable";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
        Premier League Table
      </h1>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[626px] w-[1100px] bg-[rgba(141,153,174,0.88)]">
          <ScaleLoader
            data-testid="loading-spinner"
            height={80}
            width={15}
            radius={15}
            margin={10}
            color="#ffffff"
            speedMultiplier={0.9}
          />
          <h2 className="mt-5 text-white text-2xl font-bold">Loading...</h2>
        </div>
      ) : (
        <StandingsTable rowData={rowData} />
      )}
    </div>
  );
}
