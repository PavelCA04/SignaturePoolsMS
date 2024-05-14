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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '1px' }}>
      <path d="M12 15L15 12M15 12L12 9M15 12L4 12" stroke="white" strokeOpacity={0.55} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 7V5C9 4.44772 9.44772 4 10 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H10C9.44771 20 9 19.5523 9 19V17" stroke="white" strokeOpacity={0.55} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  );
};

export default Logout;
