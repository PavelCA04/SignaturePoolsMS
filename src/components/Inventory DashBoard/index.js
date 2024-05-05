import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { itemsData } from '../../data/items';
import { loadData } from '../../data/loadData';


const Dashboard = ({ setIsAuthenticated }) => {
  const [items, setItems] = useState(itemsData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadData("http://localhost:8080/api/v1/items/");
        console.log(data);
        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const handleEdit = id => {
    const [item] = items.filter(item => item.id === id);

    setSelectedEmployee(item);
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
        const [item] = items.filter((item) => item.id === id);
  
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${item.firstName} ${item.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'darkblue-popup', // Applying the custom class again
          },
        });
  
        const itemsCopy = items.filter((item) => item.id !== id);
        localStorage.setItem('employees_data', JSON.stringify(itemsCopy));
        setItems(itemsCopy);
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
        />
      )}
      {isEditing && (
        <Edit
          items={items}
          selectedEmployee={selectedEmployee}
          setItems={setItems}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;