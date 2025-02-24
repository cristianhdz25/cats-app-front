import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TokenContext from "../../context/TokenContext";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CardComponent = ({ idCatBreed, name, description, imageURL, onDelete }) => {
  const { token } = useContext(TokenContext);
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(idCatBreed);
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ minWidth: 350, maxWidth: 350 }} style={{ margin: "auto" }}>
        <CardMedia component="img" alt="catImg" height={250} image={imageURL} />
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description.length > 200
              ? description.slice(0, 200) + "..."
              : description}
          </Typography>
        </CardContent>
        <CardActions>
          {token && (
         
              <Link to={`/editCatBreed/${idCatBreed}`}>
                <Button size="small">Edit</Button>
              </Link>       
          )}
          <Link to={`/detailCatBreed/${idCatBreed}`}>
            <Button size="small">Learn More</Button>
          </Link>

          {token && (
            <IconButton
              aria-label="delete"
              onClick={handleDeleteClick}
              style={{ marginLeft: "auto" }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Validation with PropTypes
CardComponent.propTypes = {
  idCatBreed: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired, // Nueva función para manejar la eliminación
};

export default CardComponent;
