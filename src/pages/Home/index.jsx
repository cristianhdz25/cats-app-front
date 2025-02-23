import { Container,Grid2 } from '@mui/material';
import CardComponent from "../../components/Card";  // Si estás en un subdirectorio

export const Home = () => {
    return (
        <Container maxWidth="2xl" style={{ marginTop: '80px' }}>
            <h1 style={{ textAlign: 'center' }}>Cats Breeds</h1>

            {/* Grid para las cartas */}
            <Grid2 container spacing={2} style={{ justifyContent: 'center' }}>
                {/* Ejemplo de 6 cartas */}
                {[...Array(6)].map((_, index) => (
                    <Grid2 key={index} xs={1} sm={6} md={4} lg={3} xl={12}>
                        <CardComponent
                            name="Card Name"
                            description="Card Description"
                            image="https://static.nationalgeographicla.com/files/styles/image_3200/public/green-iguana.jpg?w=1600"
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};