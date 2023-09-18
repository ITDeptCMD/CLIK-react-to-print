import React from 'react';

const Table = ({ userData }) => {
  const headers = Object.keys(userData);

  return (
    <div>
      <h2>User Data Table</h2>
      <table className='w-full text-sm text-center'>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map(header => (
              <td key={header}>{userData[header]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
