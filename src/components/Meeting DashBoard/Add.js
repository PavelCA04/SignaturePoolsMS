import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { httpClient } from '../../data/';
import { urlApi } from '../../config';

const Add = ({ meetings, setMeetings, setIsAdding, fetchData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!name || !description || !location || !date) {
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

    async function addMeeting() {
      const url = `${urlApi}meetings/`; // Replace with your actual API endpoint
      try {
        const statusCode = await httpClient.post(url, {
          name,
          description,
          location,
          date,
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        fetchData();
      }
    }
    addMeeting();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name} ${description}'s data has been Added.`,
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
        <h1>Add Meeting</h1>
        <label htmlFor="name">Name</label>
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
        <label htmlFor="location">Address</label>
        <input
          id="location"
          type="text"
          name="location"
          value={location}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
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
