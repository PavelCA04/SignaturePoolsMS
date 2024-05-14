import React, { useState, useEffect, useCallback  } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { itemsData } from '../../data/templates';
import { httpClient } from '../../data/';



const Dashboard = ({ setIsAuthenticated }) => {
  const [items, setItems] = useState(itemsData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const data = await httpClient.get("http://localhost:8080/api/v1/items/");
      if (data && data.length > 0) {
        setItems(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const handleEdit = id => {
    const [item] = items.filter(item => item.id === id);

    setSelectedItem(item);
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
          const url = `http://localhost:8080/api/v1/items/${id}`; // Replace with your actual API endpoint
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
          text: `Item data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'darkblue-popup', 
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
            items={items}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          items={items}
          setItems={setItems}
          setIsAdding={setIsAdding}
          fetchData={fetchData}
        />
      )}
      {isEditing && (
        <Edit
          items={items}
          selectedItem={selectedItem}
          setItems={setItems}
          setIsEditing={setIsEditing}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard;