import React from 'react';

const Table = ({ items, handleEdit, handleDelete }) => {
  items.forEach((item, i) => {
    item.id = i + 1;
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
            <th>Item Name</th>
            <th>Description</th>
            <th>Units Available</th>
            <th>Price per Unit ($)</th>
            <th>Total Price ($)</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.unitsavailable}</td>
                <td>{formatter.format(item.priceperunit)}</td>
                <td>{formatter.format(item.unitsavailable * item.priceperunit)} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(item.id)}
                    
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Item</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
