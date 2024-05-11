import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { meetingsData } from '../../data/dataTemplate';
import { getData } from '../../data/getData';
import { deleteData } from '../../data/deleteData';

const Dashboard = ({ setIsAuthenticated }) => {
  const [meetings, setMeetings] = useState(meetingsData);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await getData("http://localhost:8080/api/v1/meetings/");
      
      data.forEach(element => {
        // Access each element here
        console.log("----------------------------------");
        console.log(element.date);
        const dateReceive = new Date(element.date)
        console.log(dateReceive.toISOString());
        console.log("----------------------------------");
      });

      if (data && data.length > 0) {
        setMeetings(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log("Fetching");
    fetchData();
  }, [fetchData]); 

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
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard;
