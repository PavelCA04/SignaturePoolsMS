import React from 'react';

const Table = ({ meetings, handleEdit, handleDelete }) => {
  meetings.forEach((meeting, i) => {
    meeting.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Direction</th>
            <th>Phone Number</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? (
            meetings.map((meeting, i) => (
              <tr key={meeting.id}>
                <td>{i + 1}</td>
                <td>{meeting.firstName}</td>
                <td>{meeting.lastName}</td>
                <td>{meeting.email}</td>
                <td>{formatter.format(meeting.direction)}</td>
                <td>{meeting.phonenumber} </td>
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
              <td colSpan={7}>No Meetings</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
