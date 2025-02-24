import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import TokenContext from '../../context/TokenContext'; // Import the context
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const cookies = new Cookies();

// Component to display the Navbar
 const NavbarComponent =() => {
    const { setToken } = useContext(TokenContext); // Obtaining the setToken function from the context

    const handleLogout = () => {
        setToken(null); // Delete the token from the context
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
    

          {cookies.get('jwtToken') && <Link to='/addCatBreed'><Button color="inherit" >Add Breed</Button></Link>}
          {!cookies.get('jwtToken') && <Link to='/login'><Button color="inherit" >Login</Button></Link>}
          {cookies.get('jwtToken') && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavbarComponent;
