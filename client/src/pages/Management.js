import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee, fetchEmployees } from '../features/employeeSlice';
import { Button, Container, Paper, Typography, Box } from '@mui/material';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployee from './AddEmployee';

const Management = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [filterEmployee, setFilterEmployee] = useState([]);
    const employees = useSelector((state) => state.employees.employees);
    const loading = useSelector((state) => state.employees.status === 'loading');
    const error = useSelector((state) => state.employees.error);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteEmployee(id));
        } catch (err) {
            console.log('Error deleting employee:', err);
        }
    };

    useEffect(() => {
        dispatch(fetchEmployees());
    }, []);

    useEffect(() => {
        if (employees.length > 0)
            setFilterEmployee(employees.filter((employee) => employee.roleCode === 322 || employee.roleCode === 664))
    }, [open,employees]);




    if (loading) return <div>טוען...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
                <Typography variant="h5" gutterBottom align="center">
                    הנהלת הארגון - רשימת העובדים
                </Typography>


                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button onClick={() => setOpen(true)} variant="contained" color="primary">
                        הוסף עובד חדש
                    </Button>
                </Box>
                {open && <AddEmployee setOpen={setOpen} />}
                <EmployeeTable columnManager={false} employees={filterEmployee} handleDelete={handleDelete} />
            </Paper>
        </Container>
    );
};

export default Management;






