import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employeeSlice';
import { getRoles } from '../utils/api'
import { TextField, Button, Container, Typography, Alert, CircularProgress, Paper, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';



const EditEmploye = () => {
    const [name, setName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [managerName, setManagerName] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await getRoles();  // הנחת עבודה: יש פונקציה להביא את העובד לפי ה-ID
                setRoles(result);
            } catch (error) {
                setError('שגיאה בטעינת פרטי העובד');
            }
        };
        fetchRoles();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !idNumber  || !role) {
            setError('יש למלא את כל השדות');
            return;
        }
debugger
        const selectedRole = roles.find(r => r.name === role);
        const newEmployee = { name, idNumber, roleCode: selectedRole.code, isDeleted: false };

        try {
            setLoading(true);
            await dispatch(EditEmploye(newEmployee));
            setLoading(false);
            navigate('/employees');
        } catch (err) {
            setLoading(false);
            setError('שגיאה בהוספת העובד');
            console.log('err', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    הוסף עובד חדש
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="שם"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="ת.ז"
                        variant="outlined"
                        margin="normal"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="שם מנהל"
                        variant="outlined"
                        margin="normal"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>תפקיד</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            {roles?.map((r) => (
                                <MenuItem key={r.code} value={r.name}>{r.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'הוסף עובד'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};



export default EditEmployee;

