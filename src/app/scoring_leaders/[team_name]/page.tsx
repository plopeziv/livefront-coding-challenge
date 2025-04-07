"use client";

import { useParams } from "next/navigation";

export default function ScoringLeaders() {
  const { team_name } = useParams();

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
