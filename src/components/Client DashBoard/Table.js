import React from 'react';

const Table = ({ clients, handleEdit, handleDelete }) => {
  clients.forEach((client, i) => {
    client.id = i + 1;
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
            <th>Home Address</th>
            <th>Phone Number</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client, i) => (
              <tr key={client.id}>
                <td>{i + 1}</td>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.email}</td>
                <td>{formatter.format(client.direction)}</td>
                <td>{client.phonenumber} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(client.id)}
                    
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Clients</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
