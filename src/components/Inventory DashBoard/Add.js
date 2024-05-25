import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpClient } from '../../data/';
import { urlApi } from '../../config';

const Add = ({ items, setItems, setIsAdding, fetchData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [unitsAvailable, setUnitsAvailable] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');

  const handleAdd = e => {
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

    setIsAdding(false);

    async function addItem() {
      const url = `${urlApi}items/`; // Replace with your actual API endpoint
      try {
        const statusCode = await httpClient.post(url, {
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
    addItem();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'darkblue-popup',
      },
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Item</h1>
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
        <label htmlFor="Units Available">Units Available</label>
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
          onChange={e => setPricePerUnit(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
