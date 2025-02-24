import { Box, Container, Grid2 } from '@mui/material';
import CardComponent from "../../components/Card"; 
import { useEffect, useState } from 'react';
import { deleteCat, getAllCats } from '../../services/catService';
import CircularProgress from '@mui/material/CircularProgress';
import PaginationComponent from '../../components/Pagination';
import toast from 'react-hot-toast';


export const Home = () => {
    const [page, setPage] = useState(1);
    const [cats, setCats] = useState();
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [deleteCatId, setDeleteCatId] = useState(0);

    useEffect(() => {
        setLoading(true);
        getAllCats(page)
            .then((data) => {
                handleCats(data.data);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cats:', error);
                setLoading(false);
            });
    }, [page, deleteCatId, totalPages]);

    const handleCats = (data) => {
        setCats(data);
    }

    // Función para actualizar la página
    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    const onDeleted = async (id) => {
        const response = await deleteCat(id);
        if (response.success) {
            toast.success(response.message);
            setDeleteCatId(id);

            if (page > 1 && cats.length === 1) {
                setPage(page - 1);
            }

        } else {
            toast.error(response.message);
        }
    }


    return (
        <Container maxWidth="2xl" style={{ marginTop: '80px' }}>
            <h1 style={{ textAlign: 'center' }}>Cats Breeds</h1>
            {cats && (
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <PaginationComponent 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} // Pasa la función de cambio de página

                    />
                </Box>
            )}
            <Grid2 container spacing={2} style={{ justifyContent: 'center' }}>
                {cats && cats.map((cat, index) => (
                    <Grid2 key={index} xs={1} sm={6} md={4} lg={3} xl={12}>
                        <CardComponent {...cat} onDelete={onDeleted} />
                    </Grid2>
                ))}
            </Grid2>

            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                {loading && <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '20px' }} />}
            </Box>
        </Container>
    );
};
