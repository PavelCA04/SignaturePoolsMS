import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpClient } from '../../data/';


const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing, fetchData }) => {
  const id = selectedEmployee.id;

  const [name, setName] = useState(selectedEmployee.name);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [address, setSalary] = useState(selectedEmployee.address);
  const [phoneNumber, setPhoneNumber] = useState(selectedEmployee.phonenumber);

  const handleUpdate = e => {
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

    async function updateEmployee() {
      const url = `http://localhost:8080/api/v1/employees/${id}`; // Replace with your actual API endpoint
      try {
        const statusCode = await httpClient.put(url, {
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
    updateEmployee();

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
        <h1>Edit Employee</h1>
        <label htmlFor="name">Name</label>
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
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Phone Number</label>
        <input
          id="phoneNumber"
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
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
