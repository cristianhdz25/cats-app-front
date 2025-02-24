import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import { TokenProvider } from './context/TokenContext'; // Importamos el TokenProvider
import NavbarComponent from './components/Navbar';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme'; // Importa el tema desde la carpeta theme
import { Toaster } from 'react-hot-toast';
import { Register } from './pages/Register';
import { AddCatBreed } from './pages/AddCatBreed';
import { DetailCatBreed } from './pages/DetailCatBreed';
import { EditCatBreed } from './pages/EditCatBreed';

function App() {
  return (

    <TokenProvider>
      <ThemeProvider theme={theme}> {/* Aplica el tema aquí */}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
        <Router>
        <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/addCatBreed' element={<AddCatBreed />}></Route>
            <Route path='/detailCatBreed/:id' element={<DetailCatBreed />}></Route>
            <Route path='/editCatBreed/:id' element={<EditCatBreed />}></Route>
          </Routes>
        </Router>
      </ThemeProvider>

    </TokenProvider>


  );
}

export default App;
