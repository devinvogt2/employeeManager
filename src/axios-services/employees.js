import axios from "axios";

const baseURL = 'http://localhost:4000';
if (typeof baseURL !== 'undefined') {
    axios.defaults.baseURL = baseURL;
}

//get employee by id
export async function getEmployeeById() {
    try {
        const { data } = await axios.get(`/api/employees/:id`)
        return data
    } catch (error) {
        console.error(error)
    }
}

//get all employees
export async function getAllEmployees() {
    try {
        const { data } = await axios.get(`api/employees`)
        return data
    } catch (error) {
        console.error(error)
    }
}

//create new employee
export async function createEmployee() {
    try {
        const { data } = await axios.post(`/api/employees`)
        return data
    } catch (error) {
        console.error(error)
    }
}

//update employee
export async function updateEmployee() {
    try {
        const { data } = await axios.patch(`/api/employees/:id`)
        return data
    } catch (error) {
        console.error(error)
    }
}

//delete employee
export async function deleteEmployee() {
    try {
        const { data } = await axios.delete(`/api/employees/:id`)
        return data
    } catch (error) {
        console.error(error)
    }
}