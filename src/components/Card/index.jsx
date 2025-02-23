import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TokenContext from '../../context/TokenContext'; // Importamos el contexto
import PropTypes from 'prop-types';
import { useContext } from 'react';

const CardComponent = ({name , description , image }) => {
    const { token } = useContext(TokenContext); // Obtenemos el token del contexto

  return (
    <Card sx={{ maxWidth: 345  }} style={{ margin: 'auto' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
        </Typography>
      </CardContent>
      <CardActions>
       {token && <Button size="small" >Edit</Button> }
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

    
  );
}

  // Validación de las propiedades
CardComponent.propTypes = {
    name: PropTypes.string.isRequired,        // name debe ser una cadena
    description: PropTypes.string.isRequired, // description debe ser una cadena
    image: PropTypes.string.isRequired        // image debe ser una cadena (URL de la imagen)
};

export default CardComponent;
