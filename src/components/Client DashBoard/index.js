import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { clientsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [clients, setClients] = useState(clientsData);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('clients_data'));
    if (data !== null && Object.keys(data).length !== 0) setClients(data);
  }, []);

  const handleEdit = id => {
    const [client] = clients.filter(client => client.id === id);

    setSelectedClient(client);
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
        const [client] = clients.filter((client) => client.id === id);
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${client.firstName} ${client.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'darkblue-popup', // Applying the custom class again
          },
        });
  
        const clientsCopy = clients.filter((client) => client.id !== id);
        localStorage.setItem('clients_data', JSON.stringify(clientsCopy));
        setClients(clientsCopy);
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
        />
      )}
      {isEditing && (
        <Edit
          clients={clients}
          selectedClient={selectedClient}
          setClients={setClients}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
