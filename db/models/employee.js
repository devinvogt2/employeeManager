const client = require('../client');

module.exports = {
    getEmployeeById,
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
}

//create
async function createEmployee({ firstName, lastName, email }) {
    try {
        const {
            rows: [employee]
        } = await client.query(`
            INSERT INTO employees ("firstName", "lastName", email)
            VALUES ($1, $2, $3)
            ON CONFLICT DO NOTHING
            RETURNING *;
        `, [firstName, lastName, email])

        return employee

    } catch (error) {
        throw error
    }
}

//get employee by id
async function getEmployeeById(employeeId) {
    try {
        const {
            rows: [employee],
        } = await client.query(
            `
        SELECT * FROM employees
        WHERE id=$1;
        `,
            [employeeId]
        );
        return employee;
    } catch (error) {
        throw error
    }
}

async function getAllEmployees() {
    try {
        const { rows: employees } = await client.query(`
      SELECT * FROM employees;
    `);

        return employees
    } catch (error) {
        throw error
    }
}

//update
async function updateEmployee({
    id,
    firstName,
    lastName,
    email,
}) {
    try {
        const {
            rows: [employee],
        } = await client.query(
            `
                UPDATE employees
                SET "firstName"=$1, "lastName"=$2, "email"=$3
                WHERE id=$4
                 RETURNING *;
            `, [firstName, lastName, email, id]
        )

        return employee
    } catch (error) {
        throw error
    }
}

//delete

async function deleteEmployee(employeeId) {
    try {
        const {
            rows: [employee],
        } = await client.query(
            `
      DELETE FROM employees
      WHERE id=$1
      RETURNING *;
      `,
            [employeeId]
        );
        return employee;
    } catch (error) {
        throw error
    }
}