export default function ScoringTable(props) {
  const headers = props.headers;
  const rowData = props.rowData;

  const emptyRows = 15 - rowData.length;

  return (
    <table className='text-center text-base'>
      <caption id='scoring-table-caption' className='sr-only'>
        Scoring table displaying player information, including name, date of
        birth, nationality, position, goals, assists, and matches played.
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
            aria-label={`Row ${index + 1}: ${item.name}, ${
              item.position
            } with ${item.goals} goals`}
            className={`${
              index % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)] h-[30px] cursor-default`}
          >
            <td>{item.name}</td>
            <td>{item.dateOfBirth}</td>
            <td>{item.nationality}</td>
            <td>{item.position}</td>
            <td>{item.goals}</td>
            <td>{item.assists}</td>
            <td>{item.matches}</td>
          </tr>
        ))}

        {Array.from({ length: emptyRows }).map((_, idx) => (
          <tr
            key={`empty-${idx}`}
            aria-hidden='true'
            className={`${
              idx % 2 === 0
                ? "bg-[rgba(141,153,174,0.88)]"
                : "bg-[rgba(224, 232, 235, 0.88)]"
            } hover:bg-[rgba(180,200,220,0.88)]`}
          >
            <td colSpan={7} className='h-[30px]'></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
