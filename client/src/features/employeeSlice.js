import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://localhost:7052/api/Employee';
const AUTH_URL = 'https://localhost:7052/api/Auth';

// שליפת כל העובדים הפעילים
export const fetchEmployees = createAsyncThunk('employees/fetchAll', async () => {
   ////////////////////// to delete after implement login
   ///////// const responseToken = await axios.post(`${AUTH_URL}/login?userId=hhh&userName=lll`);

   ///////// localStorage.setItem("token", responseToken.data.token);
//////////////////////////////

/////////////////////
//או במקום גלובלי שיתחבר לכל קריאה או להעתיק לכל פונקציה שיש עליה auhorize
    const token = localStorage.getItem("token");
debugger
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
/////////////////
    const response = await axios.get(`${API_URL}/Get`);
    return response.data;
});


export const addEmployee = createAsyncThunk('employees/add', async (employee) => {
    const response = await axios.post(`${API_URL}/Post`, employee);
    return response.data;
});


export const updateEmployee = createAsyncThunk('employees/update', async ( updatedData ) => {
    const response = await axios.put(`${API_URL}/Put`, updatedData);
    return response.data;
});


export const deleteEmployee = createAsyncThunk('employees/delete', async (id) => {
    await axios.delete(`${API_URL}/Delete/${id}`);
    return id;
});

export const getEmployeeRole = createAsyncThunk('employees/roles', async (id) => {
    await axios.delete(`${API_URL}/Delete/${id}`);
    return id;
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                // state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(emp => emp.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp.id !== action.payload);
            });
    },
});

export default employeeSlice.reducer;

