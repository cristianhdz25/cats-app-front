import { useState } from 'react';
import { Box, Button, Container, FormControl, Grid2, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { register } from '../../services/authService'; // Asegúrate de que el método login sea correcto
import toast from 'react-hot-toast';

export const Register = () => {
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
      toast.error('Please enter both fields.');
      return;
    }

    // Llamada al servicio de login (debes pasar los datos correctamente)
    try {
      const response = await register(username, password);
        if (response.success) {
            toast.success('Register successful');
            setInterval(() => {
                window.location.href = '/login'; // Redirigir a la página principal
            }, 500);
        } else {
            toast.error(response.message);
        }  
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
        <h1 style={{ textAlign: 'center' }}>Sign in</h1>

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

        <FormControl fullWidth style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Register
          </Button>
        </FormControl>
      </Grid2>
    </Container>
  );
};
