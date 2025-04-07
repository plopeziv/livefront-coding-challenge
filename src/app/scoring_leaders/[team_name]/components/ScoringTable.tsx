export default function ScoringTable(props) {
  const headers = props.headers;
  const rowData = props.rowData;

  const emptyRows = 15 - rowData.length;

  return (
    <table className='text-center text-base'>
      <thead className='bg-[#2b2d42]'>
        <tr>
          {headers.map((header) => (
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
            tabIndex={index + 1}
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
