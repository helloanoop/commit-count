import React from 'react';
import Link from 'next/link';

const Table = ({ table }) => {
  if(!table.length) {
    return null;
  }

  return (
    <table className="min-w-full bg-white divide-y divide-gray-200">
      <thead className="">
        <tr>
          {table[0].map((header, index) => (
            <th
              key={index}
              scope="col"
              className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {cellIndex === 0 ? (
                  <Link href={`https://www.github.com/${cell}`}>
                    <a className='text-blue-500 hover:underline'>{cell}</a>
                  </Link>
                ) : (
                  cell
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CommitCounts = ({
  repo,
  table,
  loading,
  error,
}) => {
  return (
    <div className='container mx-auto mt-10'>
      {table && table.rows && table.rows.length ? (
        <>
          <h1 className='text-2xl font-bold mb-2'>
            <Link href={`https://www.github.com/${repo}`}>
              <a className='text-blue-500 hover:underline'>{repo}</a>
            </Link>
          </h1>
          <p className='text-sm text-gray-500 mb-5'>Showing last 6 months of commit counts</p>
        </>
      ): null}

      {loading && <p>Loading...</p>}

      {error && <p className='text-red-500'>{error.message}</p>}
      
      {table && table.rows && table.rows.length ? (
        <Table table={table.rows} />
      ) : null}
    </div>
  );
};

export default CommitCounts;