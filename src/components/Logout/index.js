import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        popup: 'darkblue-popup',
        cancelButton: 'button muted-button',
      },
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: 'darkblue-popup',
          },
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            navigate('/');
          },
        });
      }
    });
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
