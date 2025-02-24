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
  const { id } = useParams();
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCatData = async () => {
      const response = await getCatById(id);
      setCatData(response);
        setLoading(false);
    };
    getCatData();
  }, [id]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "80px",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Details</h1>

     {catData && <Grid2 mt={10}>
        <Box sx={{ display: "flex" }}>
          <Box
            component="img"
            border={1}
            borderColor={"#79a249"}
            borderRight={0}
            src={catData.imageURL}
            alt={catData.name}
            sx={{
              width: 400,
              height: 400,
              objectFit: "cover",
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }}
          />

          {/* Información a la derecha */}
          <Box
            border={1}
            borderLeft={0}
            borderColor={"#79a249"}
            sx={{
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              backgroundColor: "#99ab83",
            }}
            padding={2}
            width="100%"
          >
            <Typography variant="h4" textAlign={"center"} mb={8} fontWeight="bold">
              {catData.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Origin: {catData.origin}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Temperament: {catData.temperament}
            </Typography>
            <Typography variant="body1" mt={3}>
              {catData.description}
            </Typography>
          </Box>
        </Box>
      </Grid2>

    }

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
