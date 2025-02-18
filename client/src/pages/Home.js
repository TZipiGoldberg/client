import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';  // אייקון של ארגון

const Home = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Container sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontWeight: 'bold', 
                            color: '#1565c0', 
                            mb: 2 
                        }}
                    >
                        <BusinessIcon sx={{ mr: 1, fontSize: '3rem', color: '#1565c0' }} /> 
                        ניהול עובדי הארגון
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#1565c0', mb: 4 }}>
                        ניהול וארגון נתוני עובדים בצורה קלה ונוחה
                    </Typography>
                </Container>
            </Box>

            <Box component="footer" sx={{ textAlign: 'center', p: 2, backgroundColor: '#1565c0', color: 'white' }}>
                <Typography variant="body1">
                    S.A.D.C LTD | טלפון: 076-6654376 | 
                    <a href="http://www.sadac-ltd.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', marginLeft: 5 }}>
                        www.sadac-ltd.com
                    </a>
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;








  