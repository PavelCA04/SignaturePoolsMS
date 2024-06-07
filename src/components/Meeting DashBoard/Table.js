import React from 'react';

const Table = ({ meetings, handleEdit, handleDelete }) => {
  const formatDate = (date) => {  
    console.log(date);
    const datePart = date.slice(0, 10);
  
    const timePart = date.slice(11, 16);
  
    return `${datePart} ${timePart}`;
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Meeting Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? (
            meetings.map((meeting, i) => (
              <tr key={meeting.id}>
                <td>{meeting.id}</td>
                <td>{meeting.name}</td>
                <td>{meeting.description}</td>
                <td>{meeting.location}</td>
                <td>{formatDate(meeting.date)} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(meeting.id)}
                    
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(meeting.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Meetings Found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
