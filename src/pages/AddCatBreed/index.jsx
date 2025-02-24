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

import InputFileUpload from "../../components/InputFileUpload"; // Component to handle file uploads
import toast from "react-hot-toast"; // Toast notifications for success or error messages
import { submitImage } from "../../services/cloudinaryService"; // Service to upload image to Cloudinary
import { registerCat } from "../../services/catService"; // Service to register a cat breed

export const AddCatBreed = () => {
  // State variables for storing cat breed information, loading status, image file, and image preview
  const [cat, setCat] = useState({
    name: "",
    temperament: "",
    origin: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if an image file has been uploaded
    if (file === null || file === undefined || file === "") {
      toast.error("Please upload an image");
      return;
    }

    // Check if all required fields are filled out
    if (!cat.name || !cat.temperament || !cat.origin || !cat.description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true); // Show loading indicator
    const responseCloudinary = await submitImage(file); // Upload image to Cloudinary
    if (responseCloudinary) {
      cat.imageURL = responseCloudinary; // Assign uploaded image URL to cat object
    } else {
      toast.error("Error uploading image");
    }

    // Register the cat breed
    const response = await registerCat(cat);

    if (response.success) {
      toast.success(response.message); // Display success message
      // Reset form after successful registration
      setCat({
        name: "",
        temperament: "",
        origin: "",
        description: "",
        imageURL: "",
      });
      setImagePreview(null); 
      window.location.href = "/"; // Redirect to the home page
    } else {
      toast.error("Error adding cat breed");
    }

    setLoading(false); // Hide loading indicator
  };

  // Handles file selection and sets the preview image
  const handleFile = (files) => {
    setFile(files[0]);
    const fileURL = URL.createObjectURL(files[0]);
    setImagePreview(fileURL); // Set the preview image URL
  };

  // Handles changes to input fields
  const handleCatChange = (e) => {
    setCat({
      ...cat,
      [e.target.id]: e.target.value, // Update corresponding field in the cat object
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
        height: "80vh", // Container height set to 80% of the viewport height
      }}
    >
      {!loading && (
        <Grid2
          container
          direction="column"
          spacing={2}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          maxWidth={500}
          padding="40px"
          borderRadius="5px"
          border="1px solid rgb(196, 194, 194)"
          style={{ justifyContent: "center", backgroundColor: "#a1bd7f" }}
        >
          <h1 style={{ textAlign: "center" }}>Register Cat Breed</h1>

          {/* Input fields for cat breed information */}
          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                value={cat.name}
                onChange={handleCatChange}
                fullWidth
              />
            </FormControl>
          </Grid2>

          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="temperament"
                label="Temperament"
                variant="standard"
                value={cat.temperament}
                onChange={handleCatChange}
                fullWidth
              />
            </FormControl>
          </Grid2>

          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="origin"
                label="Origin"
                variant="standard"
                value={cat.origin}
                onChange={handleCatChange}
                fullWidth
              />
            </FormControl>
          </Grid2>

          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="description"
                label="Description"
                variant="standard"
                value={cat.description}
                onChange={handleCatChange}
                fullWidth
                multiline
                rows={3} // Multiline text area for description
                inputProps={{
                  style: {
                    maxHeight: "120px", // Limit height of description field
                  },
                }}
              />
            </FormControl>
          </Grid2>

          {/* Display image preview */}
          <Grid2 item xs={12}>
            {imagePreview && (
              <Box
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: imagePreview ? "auto" : "200px", // Set height based on image preview availability
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100px", // Maximum width of the image preview
                    maxHeight: "100px", // Maximum height of the image preview
                    borderRadius: "8px", // Rounded corners for the image
                    objectFit: "cover", // Ensure the image fits within the bounds
                  }}
                />
              </Box>
            )}
          </Grid2>

          {/* Input for uploading an image */}
          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <InputFileUpload handleFile={handleFile} />
            </FormControl>
          </Grid2>

          {/* Submit button */}
          <Grid2 item xs={12}>
            <FormControl fullWidth>
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
        </Grid2>
      )}

      {/* Display loading indicator while the request is being processed */}
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
