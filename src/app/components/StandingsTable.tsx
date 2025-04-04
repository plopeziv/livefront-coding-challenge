export default function StandingsTable(props) {
  const headers = props.headers;
  const rowData = props.rowData;

  return (
    <table className='text-center'>
      <thead className='bg-[#2b2d42]'>
        <tr>
          {headers.map((header) => (
            // eslint-disable-next-line react/jsx-key
            <th key={header.field} className='mx-3 min-w-[90px]'>
              {header.field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='bg-[rgba(141,153,174,0.88)]'>
        {rowData.map((item, index) => (
          <tr
            key={index}
            className={
              index % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            }
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
      </tbody>
    </table>
  );
}
