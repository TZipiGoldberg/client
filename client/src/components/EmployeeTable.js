import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TextField, TableHead, TableRow, Button, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateEmployee,fetchEmployees } from '../features/employeeSlice';
import { getRoles} from '../utils/api';

const EmployeeTable = ({ employees, handleDelete, columnManager = true }) => {
    const dispatch = useDispatch();
    const [editID, setEditID] = useState('');
    const [editData, setEditData] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await getRoles();
                setRoles(result);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const handleSave = async () => {
        if (!editID) return;
        debugger;
        try {
            const selectedRole = roles.find(r => r.name === editData.role);
            if (!selectedRole) {
                console.error('Role not found!');
                return;
            }

            const updatedEmployee = { id: editID, name: editData.name, managerName: editData.managerName, roleCode: selectedRole.code,idNumber:editData.idNumber };
            console.log('Saving Employee:', updatedEmployee);

            await dispatch(updateEmployee(updatedEmployee));
            dispatch(fetchEmployees());
            setEditData({});
            setEditID('');
        } catch (err) {
            console.error('Error saving edit:', err);
        }
    };

    const handleCancel = () => {
        setEditData({ name: '', role: '', manager: '' });
        setEditID('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                רשימת העובדים
            </Typography>

            <TableContainer component={Paper} sx={{ width: '80%', border: '1px solid #ddd', borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="טבלת עובדים">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>שם העובד</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>ת.ז</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>תפקיד</TableCell>
                            {columnManager && <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>מנהל</TableCell>}
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map(employee => (
                            <TableRow key={employee.id} hover>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {editID === employee.id ? (
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={employee.name}
                                            onChange={(e) => setEditData(data => ({ ...data, name: e.target.value }))}
                                        />
                                    ) : employee.name}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{employee.idNumber}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {editID === employee.id ? (
                                        <FormControl fullWidth>
                                            <InputLabel>תפקיד</InputLabel>
                                            <Select
                                                value={editData.role}
                                                onChange={(e) => setEditData(data => ({ ...data, role: e.target.value }))}
                                            >
                                                {roles?.map((r) => (
                                                    <MenuItem key={r.code} value={r.name}>{r.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : employee.roleName}
                                </TableCell>
                                {columnManager && <TableCell sx={{ textAlign: 'center' }}>
                                    {editID === employee.id ? (
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={employee.managerName}
                                            onChange={(e) => setEditData(data => ({ ...data, managerName: e.target.value }))}
                                        />
                                    ) : employee.managerName}
                                </TableCell>}
                                <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 1 }}>
                                    {editID === employee.id ? (
                                        <>
                                            <Button variant="contained" color="primary" size="small" onClick={handleSave}>
                                                שמור
                                            </Button>
                                            <Button variant="contained" color="warning" size="small" onClick={handleCancel}>
                                                בטל
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => {
                                                setEditID(employee.id);
                                                setEditData({ name: employee.name, role: employee.roleName, manager: employee.managerName, idNumber: employee.idNumber });
                                            }}
                                        >
                                            ערוך
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        מחק
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EmployeeTable;









