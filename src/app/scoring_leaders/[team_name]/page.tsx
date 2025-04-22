"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScoringTable from "./components/ScoringTable";

export default function ScoringLeaders() {
  const { team_name } = useParams();
  const [rowData, setRowData] = useState([]);

  const router = useRouter();

  const deslugify = (slug: string | string[]): string => {
    let singleSlug;

    if (Array.isArray(slug)) {
      singleSlug = slug.join(", ");
    } else {
      singleSlug = slug;
    }

    singleSlug = singleSlug.replace(/_/g, " ").replace(/%26/g, "&");

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
        <ScoringTable rowData={rowData} />
      </div>
      <div className='mt-4'>
        <button
          onClick={() => router.push("/")}
          className='px-6 py-3 bg-[#2b2d42] text-white text-3xl rounded-lg hover:bg-gray-800'
          aria-label='Go back to the homepage'
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
