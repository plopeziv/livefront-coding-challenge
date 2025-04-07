import { useRouter } from "next/navigation";

export default function StandingsTable(props) {
  const headers = props.headers;
  const rowData = props.rowData;

  const emptyRows = 15 - rowData.length;

  const router = useRouter();

  const handleClick = (teamName: string) => {
    router.push(`/scoring_leaders/${slugify(teamName)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, teamName: string) => {
    if (event.key === "Enter") {
      handleClick(teamName);
    }
  };

  const slugify = (text: string) => {
    return text.replace(/\s+/g, "_");
  };

  return (
    <table className='text-center'>
      <caption id='table-caption' className='sr-only'>
        Premier League Table displaying team positions, played games, wins,
        draws, losses, goals, and points.
      </caption>

      <thead className='bg-[#2b2d42]'>
        <tr>
          {headers.map((header) => (
            <th key={header.field} className='mx-3 min-w-[90px]' scope='col'>
              {header.field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-[rgba(141,153,174,0.88)]'>
        {rowData.map((item, index) => (
          <tr
            key={index}
            tabIndex={0}
            role='row'
            aria-label={`Row ${item.position}: ${item.team.name} with ${item.points} points`}
            onClick={() => handleClick(item.team.name)}
            onKeyDown={(e) => handleKeyDown(e, item.team.name)}
            className={`${
              index % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)] cursor-pointer`}
          >
            <td>{item.position}</td>
            <td>{item.team.name}</td>
            <td>{item.playedGames}</td>
            <td>{item.won}</td>
            <td>{item.draw}</td>
            <td>{item.lost}</td>
            <td>{item.goalsFor}</td>
            <td>{item.goalsAgainst}</td>
            <td>{item.goalDifference}</td>
            <td>{item.points}</td>
          </tr>
        ))}

        {Array.from({ length: emptyRows }).map((_, idx) => (
          <tr
            key={`empty-${idx}`}
            className={`${
              idx % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)] cursor-pointer`}
          >
            <td colSpan={10} className='h-[30px]'></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
