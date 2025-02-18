import axios from 'axios';


const api = axios.create({
    baseURL: 'https://localhost:7052/api',  
});

export const login = async (userId, userName) =>{
    const responseToken = await api.post(`/Auth/login?userId=${userId}&userName=${userName}`);
    localStorage.setItem("token", responseToken.data.token);
}

export const getRoles = async () => {
    const response = await api.get('/Roles/Get');
    return response.data;
};


export const getEmployees = async () => {
    const response = await api.get('https://localhost:7052/api/Employee/Get');
    return response.data;
};


export const getOS_Employees = async () => {
    const response = await api.get('/Employee/GetOSEmployees');
    return response.data;
};

export const getManagementEmployees = async () => {
    const response = await api.get('/Employee/GetManagers');
    return response.data;
};


export const deleteEmployee = async (id) => {
    const response = await api.delete(`/Employee/Delete/${id}`);
    return response.data;
};


export const addEmployee = async (employeeData) => {
  
       const response = await api.post('/Employee/Add', employeeData);
        return response.data;

};


export const editEmployee = async (id, employeeData) => {
    try {
        const response = await api.put(`/Employee/Update/${id}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error editing employee:', error);
        throw error;
    }
};

export default api;




