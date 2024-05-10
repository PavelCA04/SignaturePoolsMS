import React from 'react';
import Swal from 'sweetalert2';

const Modules = () => {
  const modules = [
    { name: 'INVENTORY DASHBOARD', description: " || General information about the company's inventory" },
    { name: 'MEETINGS DASHBOARD', description: " || General information about the company's meetings" },
    { name: 'EMPLOYEES DASHBOARD', description: " || General information about the company's employees" },
    { name: 'CLIENTS DASHBOARD', description: " || General information about the company's clients" },
  ]; // List of modules with names and descriptions

  const handleModuleClick = (moduleName) => {
    Swal.fire({
      title: `You will be directed to the ${moduleName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`,
      icon: 'info',
      confirmButtonText: 'Okay',
      background: 'var(--darkblue)',
      color: 'var(--white)',
    });
  };

  return (
    <div className="button-menu-container">
      {modules.map((module) => (
        <button
          key={module.name}
          className="module-button"
          onClick={() => handleModuleClick(module.name)}
        >
          <span className="module-name">{module.name}</span>
          <span className="module-description">{module.description}</span>
        </button>
      ))}
    </div>
  );
};

export default Modules;
