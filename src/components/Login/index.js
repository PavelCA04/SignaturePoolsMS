import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'signaturepools@gmail.com';
  const adminPassword = 'admin';

  const [email, setEmail] = useState('signaturepools@gmail.com');
  const [password, setPassword] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
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
          navigate('/menu');

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'darkblue-popup',
            },
          });
        },
      });
    } else {
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
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
            customClass: {
              popup: 'darkblue-popup',
            },
          });
        },
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="1234"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
