import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import InputFileUpload from "../../components/InputFileUpload";
import { submitImage } from "../../services/cloudinaryService";
import { getCatById, updateCat } from "../../services/catService";

export const EditCatBreed = () => {
  // Get the 'id' of the cat breed from the URL parameter
  const { id } = useParams();
  
  // State to store cat breed details
  const [cat, setCat] = useState({
    name: "",
    temperament: "",
    origin: "",
    description: "",
    imageURL: "",
  });

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // State to manage file upload (new image)
  const [file, setFile] = useState(null);

  // Fetch cat breed data when component mounts or id changes
  useEffect(() => {
    setLoading(true);
    const fetchCatData = async () => {
      try {
        const response = await getCatById(id);
        if (response) {
          setCat(response); // Update the state with the fetched data
        } else {
          toast.error("Failed to load cat data"); // Show error if data is not found
        }
      } finally {
        setLoading(false); // Stop loading when finished
      }
    };
    fetchCatData();
  }, [id]); // Run when the id changes

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!cat.name || !cat.temperament || !cat.origin || !cat.description) {
      toast.error("Please fill all fields"); // Show error if any field is empty
      return;
    }

    setLoading(true);

    try {
      // If there's a new image file, upload it and update the image URL
      if (file) {
        const imageUrl = await submitImage(file);
        if (imageUrl) {
          cat.imageURL = imageUrl; // Update cat image URL with the uploaded one
        } else {
          toast.error("Error uploading image"); // Show error if upload fails
          setLoading(false);
          return;
        }
      }

      // Add the cat breed id to the data to be updated
      cat.idCatBreed = id;

      // Send update request
      const response = await updateCat(cat);

      if (response.success) {
        toast.success(response.message); // Show success message
      } else {
        toast.error(response.message); // Show error message
      }
    } catch (error) {
      toast.error(error.message); // Show error message if there's an issue
    } finally {
      setLoading(false); // Stop loading once the request is finished
    }
  };

  // Handle file selection for image upload
  const handleFile = (files) => {
    setFile(files[0]); // Update the state with the selected file
  };

  // Handle input field changes for cat breed details
  const handleCatChange = (e) => {
    setCat({
      ...cat,
      [e.target.id]: e.target.value, // Update the corresponding field in cat state
    });
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "80px", // Add top margin
        display: "flex", // Flexbox for center alignment
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        height: "90vh", // Set container height
      }}
    >
      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid2
          container
          direction="column"
          spacing={2}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          minWidth="500px"
          padding="40px"
          borderRadius="5px"
          border="1px solid rgb(196, 194, 194)"
          style={{ justifyContent: "center", backgroundColor: "#a1bd7f" }}
        >
          {/* Title for the page */}
          <Typography variant="h4" textAlign="center">
            Edit Cat Breed
          </Typography>

          {/* Display current image if it exists */}
          {cat.imageURL && (
            <Grid2 item xs={12}>
              <Box
                component="img"
                src={cat.imageURL} // Current cat image URL
                alt={cat.name} // Alt text with cat breed name
                sx={{
                  width: "100%", // Full width
                  height: 200, // Height of the image
                  objectFit: "cover", // Ensure the image covers the area without distortion
                  borderRadius: 2, // Border radius for rounded corners
                  border: "1px solid #79a249", // Border color
                }}
              />
            </Grid2>
          )}

          {/* Form for editing cat breed details */}
          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="name"
                label="Name"
                variant="standard"
                value={cat.name}
                onChange={handleCatChange} // Update state on input change
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
                placeholder="Description"
                fullWidth
                multiline
                rows={2} // Limit to 2 visible rows
                sx={{ marginTop: 2, maxHeight: 100 }} // Set max height for the description input
              />
            </FormControl>
          </Grid2>

          {/* Image upload section */}
          <Grid2 item xs={12}>
            <FormControl fullWidth>
              <InputFileUpload handleFile={handleFile} />
            </FormControl>
          </Grid2>

          {/* Save button */}
          <Grid2 item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit} // Trigger handleSubmit on click
              fullWidth
            >
              Save
            </Button>
          </Grid2>

          {/* Show loading spinner during submission */}
          {loading && (
            <CircularProgress sx={{ display: "block", margin: "auto" }} />
          )}
        </Grid2>
      )}
    </Container>
  );
};
