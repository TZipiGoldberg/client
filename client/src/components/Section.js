import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', borderBottom: '4px solid #125699' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
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
            </Toolbar>
        </AppBar>
    );
};

// עיצוב הקישורים בתפריט
const navStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        textDecoration: 'underline',
    }
};

export default Header;


