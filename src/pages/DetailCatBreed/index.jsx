import {
  Box,
  CircularProgress,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatById } from "../../services/catService";

export const DetailCatBreed = () => {
  // Get the 'id' from the URL parameter
  const { id } = useParams();
  
  // State to store the cat breed data
  const [catData, setCatData] = useState(null);

  // State to handle loading state (loading indicator)
  const [loading, setLoading] = useState(false);

  // useEffect to fetch the data when the component mounts
  useEffect(() => {
    // Indicate that data is being loaded
    setLoading(true);

    // Function to fetch cat breed data using the 'id'
    const getCatData = async () => {
      const response = await getCatById(id);
      
      // Update state with the fetched cat breed data
      setCatData(response);
      
      // Indicate that loading has finished
      setLoading(false);
    };

    // Call the function to fetch data
    getCatData();
  }, [id]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "80px", // Top spacing to center content
        alignItems: "center", // Center align the content
        justifyContent: "center", // Justify content in the center
        height: "90vh", // Set the height of the view
      }}
    >
      {/* Title of the page */}
      <h1 style={{ textAlign: "center" }}>Details</h1>

      {/* Conditional to display cat breed data if available */}
      {catData && (
        <Grid2 container direction="column" spacing={4} alignItems="center">
          <Grid2 item xs={12}>
            <Box sx={{ display: "flex" }}>
              {/* Cat breed image */}
              <Box
                component="img"
                border={1}
                borderColor={"#79a249"}
                borderRight={0}
                src={catData.imageURL} // Image URL
                alt={catData.name} // Breed name as alt text
                sx={{
                  width: 400, // Image width
                  height: 400, // Image height
                  objectFit: "cover", // Fit the image inside the container
                  borderTopLeftRadius: 6, // Top-left corner radius
                  borderBottomLeftRadius: 6, // Bottom-left corner radius
                }}
              />
              {/* Cat breed information */}
              <Box
                border={1}
                borderLeft={0}
                borderColor={"#79a249"}
                sx={{
                  borderTopRightRadius: 6, // Top-right corner radius
                  borderBottomRightRadius: 6, // Bottom-right corner radius
                  backgroundColor: "#99ab83", // Background color
                }}
                padding={2}
                width="100%" // Full width
              >
                {/* Breed name */}
                <Typography variant="h4" textAlign={"center"} mb={4} fontWeight="bold">
                  {catData.name} {/* Cat breed name */}
                </Typography>
                {/* Origin information of the breed */}
                <Typography variant="subtitle1" color="text.secondary">
                  Origin: {catData.origin}
                </Typography>
                {/* Temperament information of the breed */}
                <Typography variant="subtitle1" color="text.secondary">
                  Temperament: {catData.temperament}
                </Typography>
                {/* Breed description */}
                <Typography variant="body1" mt={3}>
                  {catData.description} {/* Description of the cat breed */}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      )}

      {/* Loading indicator */}
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
