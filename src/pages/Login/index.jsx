import { useState } from 'react';
import { Box, Button, Container, FormControl, Grid2, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { login } from '../../services/authService'; // Asegúrate de que el método login sea correcto

export const Login = () => {
  // Estados para los campos de usuario y contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Manejo del evento de cambio de los campos
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Validación básica (puedes personalizarla)
    if (!username || !password) {
      alert('Por favor, ingrese ambos campos.');
      return;
    }

    // Llamada al servicio de login (debes pasar los datos correctamente)
    try {
      await login(username, password);
        window.location.href = '/'; // Redirigir a la página principal    
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar errores (puedes mostrar un mensaje de error al usuario)
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
        height: '100vh', // Asegura que el contenedor ocupe toda la altura de la pantalla
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
        style={{ justifyContent: 'center' }}
      >
        <h1 style={{ textAlign: 'center' }}>Log In</h1>

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} fullWidth>
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

        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} fullWidth>
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
          <a href="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Don&apos;t have an account? Register here
          </a>
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
