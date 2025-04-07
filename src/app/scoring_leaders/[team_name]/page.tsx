"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ScoringTable from "./components/ScoringTable";

export default function ScoringLeaders() {
  const { team_name } = useParams();
  const [rowData, setRowData] = useState([]);

  const colNames = [
    { field: "Name" },
    { field: "Date of Birth" },
    { field: "Nationality" },
    { field: "Position" },
    { field: "Goals" },
    { field: "Assists" },
    { field: "Matches" },
  ];

  const deslugify = (slug: string | string[]): string => {
    let singleSlug;

    if (Array.isArray(slug)) {
      singleSlug = slug.join(", ");
    } else {
      singleSlug = slug;
    }

    singleSlug = singleSlug.replace(/_/g, " ");

    return singleSlug;
  };

  const desluggedTeam = deslugify(team_name);

  const filterScorers = (teamName, standingsObject) => {
    if (!standingsObject) {
      return [];
    }
    const filteredStandings = standingsObject
      .filter((player) => {
        const isMatch = player.team.name === teamName;
        return isMatch;
      })
      .map((player) => ({
        name: player.player.name,
        dateOfBirth: player.player.dateOfBirth,
        nationality: player.player.nationality,
        position: player.player.section,
        goals: player.goals,
        assists: player.assists,
        matches: player.playedMatches,
      }));

    return filteredStandings;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await fetch("/api/scorers");

        const jsonData = await fetchResponse.json();

        const filteredPlayers = filterScorers(desluggedTeam, jsonData.scorers);
        setRowData(filteredPlayers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [desluggedTeam]);

  return (
    <div className='text-5xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] text-center'>
      <h1>{desluggedTeam}</h1>
      <h2 className='mb-5'>In Top 100</h2>
      <div className='w-[1075px] flex justify-center'>
        <ScoringTable headers={colNames} rowData={rowData} />
      </div>
    </div>
  );
}
