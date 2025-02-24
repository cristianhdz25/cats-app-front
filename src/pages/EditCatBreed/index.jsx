import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InputFileUpload from "../../components/InputFileUpload";
import { submitImage } from "../../services/cloudinaryService";
import { getCatById, updateCat } from "../../services/catService";

export const EditCatBreed = () => {
  const { id } = useParams();
  const [cat, setCat] = useState({
    name: "",
    temperament: "",
    origin: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Cargar datos de la raza de gato al montar el componente
  useEffect(() => {
    setLoading(true);
    const fetchCatData = async () => {
      try {
        const response = await getCatById(id);
        if (response) {
          setCat(response);
        } else {
          toast.error("Failed to load cat data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCatData();
  }, [id]);

  // Manejo del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cat.name || !cat.temperament || !cat.origin || !cat.description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Si hay una nueva imagen, la subimos y actualizamos el URL
      if (file) {
        const imageUrl = await submitImage(file);
        if (imageUrl) {
          cat.imageURL = imageUrl;
        } else {
          toast.error("Error uploading image");
          setLoading(false);
          return;
        }
      }

      cat.idCatBreed = id; // Agregar el ID de la raza de gato

      // Enviar actualización
      const response = await updateCat(cat);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) { 
        toast.error(error.message);
    }finally {
      setLoading(false);
    }
  };

  const handleFile = (files) => {
    setFile(files[0]);
  };

  const handleCatChange = (e) => {
    setCat({
      ...cat,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 4,
            borderRadius: 2,
            border: "1px solid #ccc",
            backgroundColor: "#a1bd7f",
            width: "100%",
            maxWidth: 500,
          }}
        >
          <Typography variant="h4" textAlign="center">
            Edit Cat Breed
          </Typography>

          {/* Imagen actual */}
          {cat.imageURL && (
            <Box
              component="img"
              src={cat.imageURL}
              alt={cat.name}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #79a249",
              }}
            />
          )}

          <FormControl fullWidth>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              value={cat.name}
              onChange={handleCatChange}
              fullWidth
            />
            <TextField
              id="temperament"
              label="Temperament"
              variant="standard"
              value={cat.temperament}
              onChange={handleCatChange}
              fullWidth
            />
            <TextField
              id="origin"
              label="Origin"
              variant="standard"
              value={cat.origin}
              onChange={handleCatChange}
              fullWidth
            />

            <TextField
            id="description"
            label="Description"
            variant="standard"
            value={cat.description}
            onChange={handleCatChange}
            placeholder="Description"
            fullWidth
            multiline
            rows={2} // Establece que el campo solo tenga 3 filas visibles
            sx={{marginTop: 2, maxHeight: 100}} // Establece una altura máxima de 100px
            />
          </FormControl>

          {/* Subida de nueva imagen */}
          <InputFileUpload handleFile={handleFile} />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Save
          </Button>

          {loading && (
            <CircularProgress sx={{ display: "block", margin: "auto" }} />
          )}
        </Box>
      )}
    </Container>
  );
};
