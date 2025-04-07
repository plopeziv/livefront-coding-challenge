"use client";

import { useParams } from "next/navigation";
import ScoringTable from "./components/ScoringTable";

export default function ScoringLeaders() {
  const { team_name } = useParams();

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

  const blankRows = Array.from({ length: 10 }, (_, i) => ({
    Position: i + 1,
    team: { name: "" },
    "Played Games": "",
    Won: "",
    Draw: "",
    Lost: "",
    "Goals For": "",
    "Goals Against": "",
    "+ -": "",
    Points: "",
  }));

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

  return (
    <div className='text-5xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] text-center'>
      <h1>{desluggedTeam}</h1>
      <h2>In Top 100</h2>
    </div>
  );
}
