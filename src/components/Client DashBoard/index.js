import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { clientsData } from '../../data/templates';
import { httpClient } from '../../data/';

const Dashboard = ({ setIsAuthenticated }) => {
  const [clients, setClients] = useState(clientsData);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async (param = '') => {
    try {
      const data = await httpClient.get(buildURL(param));
      if (data && data.length > 0) {
        setClients(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const buildURL = (param) => {
    if (param){
      return `http://localhost:8080/api/v1/clients?search=${param}`;
    }
    return `http://localhost:8080/api/v1/clients`;
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const handleEdit = id => {
    const [client] = clients.filter(client => client.id === id);

    setSelectedClient(client);
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
        async function deleteClient() {
          const url = `http://localhost:8080/api/v1/clients/${id}`; // Replace with your actual API endpoint
          try {
            const statusCode = await httpClient.delete(url);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            fetchData();
          }
        }
        deleteClient();
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `The data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'darkblue-popup', // Applying the custom class again
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
            isSearching={isSearching}
            fetchData={fetchData}
          />
          <Table
            clients={clients}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          clients={clients}
          setClients={setClients}
          setIsAdding={setIsAdding}
          fetchData={fetchData}
        />
      )}
      {isEditing && (
        <Edit
          clients={clients}
          selectedClient={selectedClient}
          setClients={setClients}
          setIsEditing={setIsEditing}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard;
