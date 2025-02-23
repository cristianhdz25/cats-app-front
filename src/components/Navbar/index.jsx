import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import TokenContext from '../../context/TokenContext'; // Importamos el contexto
import { useContext } from 'react';

const cookies = new Cookies();

 const NavbarComponent =() => {
    const { setToken } = useContext(TokenContext); // Obtenemos el token del contexto

    const handleLogout = () => {
        setToken(null); // Eliminamos el token del estado global
        // Aquí puedes eliminar el token de las cookies si es necesario:
        const cookies = new Cookies();
        cookies.remove('jwtToken');
      };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CatBreeds App
          </Typography>
          {cookies.get('jwtToken') &&<Button color="inherit">Add breed</Button>}
          {!cookies.get('jwtToken') && <Button color="inherit" href='/login'>Login</Button>}
          {cookies.get('jwtToken') && <Button color="inherit" onClick={handleLogout}>Logout</Button>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarComponent;
