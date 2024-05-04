import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { meetingsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [meetings, setMeetings] = useState(meetingsData);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('meetings_data'));
    if (data !== null && Object.keys(data).length !== 0) setMeetings(data);
  }, []);

  const handleEdit = id => {
    const [meeting] = meetings.filter(meeting => meeting.id === id);

    setSelectedMeeting(meeting);
    setIsEditing(true);
  };

  
  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        popup: 'darkblue-popup', // Adding the custom class
        confirmButton: 'button muted-button'
      },
    }).then((result) => {
      if (result.isConfirmed) { // Corrected from 'result.value' to 'result.isConfirmed'
        const [meeting] = meetings.filter((meeting) => meeting.id === id);
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${meeting.firstName} ${meeting.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'darkblue-popup', // Applying the custom class again
            confirmButton: 'button muted-button'
          },
        });
  
        const meetingsCopy = meetings.filter((meeting) => meeting.id !== id);
        localStorage.setItem('meetings_data', JSON.stringify(meetingsCopy));
        setMeetings(meetingsCopy);
      }
    });
  };
  


  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            meetings={meetings}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          meetings={meetings}
          setMeetings={setMeetings}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          meetings={meetings}
          selectedMeeting={selectedMeeting}
          setMeetings={setMeetings}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
