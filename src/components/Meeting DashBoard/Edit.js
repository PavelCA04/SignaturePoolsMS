import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ meetings, selectedMeeting, setMeetings, setIsEditing }) => {
  const id = selectedMeeting.id;

  const [firstName, setFirstName] = useState(selectedMeeting.firstName);
  const [lastName, setLastName] = useState(selectedMeeting.lastName);
  const [email, setEmail] = useState(selectedMeeting.email);
  const [salary, setSalary] = useState(selectedMeeting.salary);
  const [date, setDate] = useState(selectedMeeting.date);

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
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

    const meeting = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
    };

    for (let i = 0; i < meetings.length; i++) {
      if (meetings[i].id === id) {
        meetings.splice(i, 1, meeting);
        break;
      }
    }

    localStorage.setItem('meetings_data', JSON.stringify(meetings));
    setMeetings(meetings);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${meeting.firstName} ${meeting.lastName}'s data has been updated.`,
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
        <label htmlFor="firstName">Meeting Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Client Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Description</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Address</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <label htmlFor="date">Date/Hour</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
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