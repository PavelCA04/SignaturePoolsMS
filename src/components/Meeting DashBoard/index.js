import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { meetingsData } from '../../data/templates';
import { httpClient } from '../../data/';

const Dashboard = ({ setIsAuthenticated }) => {
  const [meetings, setMeetings] = useState(meetingsData);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const data = await httpClient.get("http://localhost:8080/api/v1/meetings/");
      if (data && data.length > 0) {
        setMeetings(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const handleEdit = id => {
    const [meeting] = meetings.filter(meeting => meeting.id === id);

    setSelectedMeeting(meeting);
    setIsEditing(true);
  };

  const ReturnToMainMenu = () => {
    navigate('/menu');
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
        async function deleteItem() {
          const url = `http://localhost:8080/api/v1/meetings/${id}`; // Replace with your actual API endpoint
          try {
            const statusCode = await httpClient.delete(url);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            fetchData();
          }
        }
        deleteItem();
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `The data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'darkblue-popup', // Applying the custom class again
            confirmButton: 'button muted-button'
          },
        });
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
            returnToMainMenu={ReturnToMainMenu}
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
          fetchData={fetchData}
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
