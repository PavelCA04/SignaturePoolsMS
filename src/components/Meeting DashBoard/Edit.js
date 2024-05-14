import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { httpClient } from '../../data/index';

const Edit = ({ meetings, selectedMeeting, setMeetings, setIsEditing, fetchData }) => {
  const id = selectedMeeting.id;

  const [name, setName] = useState(selectedMeeting.name);
  const [description, setDescription] = useState(selectedMeeting.description);
  const [location, setLocation] = useState(selectedMeeting.location);
  const [date, setDate] = useState(selectedMeeting.date);

  const formatDate = (date) => {  
    return `${date.slice(0, 10)}T${date.slice(11, 16)}`;
  }

  const handleUpdate = e => {
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

    async function updateMeeting() {
      const url = `http://localhost:8080/api/v1/meetings/${id}`; // Replace with your actual API endpoint
      try {
        const statusCode = await httpClient.put(url, {
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
    updateMeeting();

    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${name} data has been updated.`,
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
        <h1>Edit Meeting</h1>
        <label htmlFor="name">Meeting Name</label>
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
          onChange={e => setDescription (e.target.value)}
        />
        <label htmlFor="salary">Address</label>
        <input
          id="location"
          type="text"
          name="location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          name="date"
          value={formatDate(date)}
          onChange={e => setDate(e.target.value)}
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
