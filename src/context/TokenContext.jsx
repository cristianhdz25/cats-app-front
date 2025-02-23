import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// Crear un contexto
const TokenContext = createContext();

// Crear un proveedor del contexto
export const TokenProvider = ({ children }) => {

  const [token, setToken] = useState(cookies.get('jwtToken')); // Guardamos el token en el estado

  useEffect(() => {
    const handleTokenChange = () => {
      setToken(cookies.get('jwtToken')); // Actualizamos el token si cambia
    };

    window.addEventListener('storage', handleTokenChange); // Escuchamos cambios en el storage

    return () => {
      window.removeEventListener('storage', handleTokenChange); // Limpiamos al desmontar el componente
    };
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
    children: PropTypes.any.isRequired, 
};

// Exportamos el contexto para usarlo en otros componentes
export default TokenContext;
