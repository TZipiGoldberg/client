import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const Header = () => {
    const navigate = useNavigate();

   
    const handleLogout = () => {
       
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
       
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', borderBottom: '4px solid #125699' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', width: '100%' }}>
                    <Typography variant="h6" component={Link} to="/" sx={navStyle}>
                        דף ראשי
                    </Typography>
                    <Typography variant="h6" component={Link} to="/employees" sx={navStyle}>
                        עובדי הארגון
                    </Typography>
                    <Typography variant="h6" component={Link} to="/os-employees" sx={navStyle}>
                        עובדי קבלן OS
                    </Typography>
                    <Typography variant="h6" component={Link} to="/management" sx={navStyle}>
                        הנהלה
                    </Typography>
                </Box>
                
                <Button color="inherit" onClick={handleLogout}>
                    יציאה
                </Button>
            </Toolbar>
        </AppBar>
    );
};


const navStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        textDecoration: 'underline',
    }
};

export default Header;






