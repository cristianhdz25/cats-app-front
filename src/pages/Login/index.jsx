import { useState } from 'react';
import { Box, Button, Container, FormControl, Grid2, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { login } from '../../services/authService'; 
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Manage the changes in the input fields
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Manage the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    if (!username || !password) {
      toast.error('Please fill all fields');
      return;
    }

    // Llamada al servicio de login (debes pasar los datos correctamente)
    try {
      const response = await login(username, password);
        if(response){
            toast.success('Login successful');
            setInterval(() => {
                window.location.href = '/'; // Redirect to the home page
            }, 500);
        } else {
            toast.error("Invalid credentials");
        }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container
      maxWidth="2xl"
      style={{
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // Asegura que el contenedor ocupe toda la altura de la pantalla
      }}
    >
      <Grid2
        container
        spacing={2}
        direction={'column'}
        minWidth="400px"
        padding={'40px'}
        borderRadius={'5px'}
        border={'1px solid rgb(196, 194, 194)'}
        style={{ justifyContent: 'center', backgroundColor: '#a1bd7f' }}
      >
        <h1 style={{ textAlign: 'center' }}>Log in</h1>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="username"
            label="Username"
            variant="standard"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
          <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </Box>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Don&apos;t have an account? Register here
          </Link>
        </div>

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Login
          </Button>
        </FormControl>
      </Grid2>
    </Container>
  );
};
