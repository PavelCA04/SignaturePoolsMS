import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpClient } from '../../data/';

const Add = ({ employees, setEmployees, setIsAdding, fetchData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!name || !email || !address || !phoneNumber) {
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

    async function addItem() {
      const url = 'http://localhost:8080/api/v1/employees/'; // Replace with your actual API endpoint
      try {
        const statusCode = await httpClient.post(url, {
          name,
          email,
          address,
          phoneNumber,
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        fetchData();
      }
    }
    addItem();
    setIsAdding(false);

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
        <h1>Add Employee</h1>
        <label htmlFor="name">First Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <label htmlFor="address">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
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
