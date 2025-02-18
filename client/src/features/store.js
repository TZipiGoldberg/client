import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice'; 

const store = configureStore({
    reducer: {
        employees: employeeReducer,
    },
    devTools: true 
});

export default store;


