import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid2,
  TextField,
} from "@mui/material";

import InputFileUpload from "../../components/InputFileUpload";
import toast from "react-hot-toast";
import { submitImage } from "../../services/cloudinaryService";
import { registerCat } from "../../services/catService";

export const AddCatBreed = () => {
  const [cat, setCat] = useState({
    name: "",
    temperament: "",
    origin: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file === null || file === undefined || file === "") {
      toast.error("Please upload an image");
      return;
    }

    if (!cat.name || !cat.temperament || !cat.origin || !cat.description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    const responseCloudinary = await submitImage(file);
    if (responseCloudinary) {
      cat.imageURL = responseCloudinary;
    } else {
      toast.error("Error uploading image");
    }

    const response = await registerCat(cat);

    if (response.success) {
      toast.success(response.message);
      setCat({
        name: "",
        temperament: "",
        origin: "",
        description: "",
        imageURL: "",
      });
      setImagePreview(null); // Limpiar la vista previa después de registrar la raza
    } else {
      toast.error("Error adding cat breed");
    }

    setLoading(false);
  };

  const handleFile = (files) => {
    setFile(files[0]);
    const fileURL = URL.createObjectURL(files[0]); // Generar URL para la vista previa
    setImagePreview(fileURL); // Establecer la URL de la imagen en el estado
  };

  const handleCatChange = (e) => {
    setCat({
      ...cat,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh", // Asegura que el contenedor ocupe toda la altura de la pantalla
      }}
    >
      <Grid2
        container
        direction={"column"}
        minWidth={"500px"}
        padding={"40px"}
        borderRadius={"5px"}
        border={"1px solid rgb(196, 194, 194)"}
        style={{ justifyContent: "center", backgroundColor: "#a1bd7f" }}
      >
        <h1 style={{ textAlign: "center" }}>Register Cat Breed</h1>

        <FormControl fullWidth style={{ marginTop: "20px" }}>
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
          inputProps={{
            style: {
              maxHeight: "120px", // Limita la altura máxima del campo a 3 párrafos
            },
          }}/>


          {/* Contenedor con espacio reservado para la vista previa */}
          {imagePreview && (
            <Box
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: imagePreview ? "auto" : "200px", // Reservamos el espacio
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "200px", // Limitar el tamaño de la imagen
                  maxHeight: "200px",
                  borderRadius: "8px",
                  objectFit: "cover", // Asegura que la imagen se recorte correctamente
                }}
              />
            </Box>
          )}

          <InputFileUpload handleFile={handleFile} />
        </FormControl>

        <FormControl fullWidth style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Save
          </Button>
        </FormControl>
      </Grid2>

      <Box style={{ textAlign: "center", marginTop: "20px" }}>
        {loading && (
          <CircularProgress
            style={{ display: "block", margin: "auto", marginTop: "20px" }}
          />
        )}
      </Box>
    </Container>
  );
};
