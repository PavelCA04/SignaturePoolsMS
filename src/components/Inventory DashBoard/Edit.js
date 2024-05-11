import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpClient }  from '../../data/index';

const Edit = ({ items, selectedItem, setItems, setIsEditing, fetchData }) => {
  const id = selectedItem.id;

  const [name, setName] = useState(selectedItem.name);
  const [description, setDescription] = useState(selectedItem.description);
  const [unitsAvailable, setUnitsAvailable] = useState(selectedItem.unitsavailable);
  const [pricePerUnit, setSalary] = useState(selectedItem.priceperunit);

  const handleUpdate = e => {
    e.preventDefault();

    if (!name || !description || !unitsAvailable || !pricePerUnit) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
        customClass: {
          popup: 'darkblue-popup',
        },
      });
    }

    async function updateItem() {
      const url = `http://localhost:8080/api/v1/items/${id}`; // Replace with your actual API endpoint
      try {
        const statusCode = await httpClient.put(url, {
          name,
          description,
          unitsAvailable,
          pricePerUnit,
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        fetchData();
      }
    }
    updateItem();

    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'darkblue-popup',
      },
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Item</h1>
        <label htmlFor="name">Item Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="unitsAvailable">Units Available</label>
        <input
          id="unitsAvailable"
          type="number"
          name="unitsAvailable"
          value={unitsAvailable}
          onChange={e => setUnitsAvailable(e.target.value)}
        />
        <label htmlFor="pricePerUnit">Price per Unit ($)</label>
        <input
          id="pricePerUnit"
          type="number"
          name="pricePerUnit"
          value={pricePerUnit}
          onChange={e => setSalary(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
