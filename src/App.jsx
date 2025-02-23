import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TokenProvider } from './context/TokenContext'; // Importamos el TokenProvider
import NavbarComponent from './components/Navbar';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme'; // Importa el tema desde la carpeta theme

function App() {
  return (

    <TokenProvider>
      <ThemeProvider theme={theme}> {/* Aplica el tema aquí */}
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </TokenProvider>
  );
}

export default App;
