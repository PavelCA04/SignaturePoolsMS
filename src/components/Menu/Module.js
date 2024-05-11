import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Modules = () => {
  const modules = [
    { name: 'INVENTORY DASHBOARD', description: " || General information about the company's inventory", route: '/inventory' },
    { name: 'MEETINGS DASHBOARD', description: " || General information about the company's meetings", route: '/meetings' },
    { name: 'EMPLOYEES DASHBOARD', description: " || General information about the company's employees", route: '/employees' },
    { name: 'CLIENTS DASHBOARD', description: " || General information about the company's clients", route: '/clients' },
  ]; // Adding a route field to each module

  const navigate = useNavigate();

  const handleModuleClick = (moduleName, moduleRoute) => {
    Swal.fire({
      title: `You will be directed to the ${moduleName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`,
      icon: 'info',
      confirmButtonText: 'Okay',
      background: 'var(--darkblue)',
      color: 'var(--white)',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(moduleRoute); 
      }
    });
  };

  return (
    <div className="button-menu-container">
      {modules.map((module) => (
        <button
          key={module.name}
          className="module-button"
          onClick={() => handleModuleClick(module.name, module.route)}
        >
          <span className="module-name">{module.name}</span>
          <span className="module-description">{module.description}</span>
        </button>
      ))}
    </div>
  );
};

export default Modules;
