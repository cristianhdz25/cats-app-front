import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import TokenContext from '../../context/TokenContext'; // Importamos el contexto
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';


const cookies = new Cookies();

 const NavbarComponent =() => {
    const { setToken } = useContext(TokenContext); // Obtenemos el token del contexto

    const handleLogout = () => {
        setToken(null); // Eliminamos el token del estado global
        // Aquí puedes eliminar el token de las cookies si es necesario:
        const cookies = new Cookies();
        cookies.remove('jwtToken');
        toast.success('Logout successful');
      };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
               CatBreeds App
            </Link>
          </Typography>
    
          {cookies.get('jwtToken') && <Link component='button' color='inherit' to='/addCatBreed' style={{ textDecoration: 'none', color: 'black' }}>ADD BREED</Link>}
          {!cookies.get('jwtToken') && <Link component='button' color='inherit' to='/login' style={{ textDecoration: 'none', color: 'black' }}><LoginTwoToneIcon/></Link>}
          {cookies.get('jwtToken') && <Button color="inherit" onClick={handleLogout}><LogoutIcon/></Button>}
   
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarComponent;
