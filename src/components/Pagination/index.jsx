import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';

export default function PaginationComponent({totalPages, onPageChange}) {
  const handleChange = (event, value) => {
    onPageChange(value); // Llama a la función de cambio de página pasada como prop
  };

  return (
      <Pagination 
        count={totalPages} 
        color="primary" 
        onChange={handleChange} // Evento que actualiza la página
      />
  );
}

PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired, // Usar 'number' en lugar de 'int'
  onPageChange: PropTypes.func.isRequired,  // La función 'onPageChange' es obligatoria
};
