const client = require("./client");
const {
    User,
    Employee
} = require("./");

async function dropTables() {
    try {
        console.log('dropping tables.....')
        await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS employees;

        `)

        console.log('finished dropping tables!')

    } catch (error) {
        throw error
    }
}


async function createTables() {
    try {
        console.log("creating tables.....")
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE,
                password VARCHAR(255)
            );

             CREATE TABLE employees (
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255),
                "lastName" VARCHAR(255),
                email VARCHAR(255) UNIQUE
            );
        `)

        console.log('finished creating tables!')
    } catch (error) {
        throw error
    }
}

async function createInitialUser() {
    console.log('creating initial users')

    try {
        const createInitUser = [
            {
                username: 'djpaulyd',
                password: 'testing',
            }
        ]
        const users = await Promise.all(createInitUser.map(User.createUser));

        console.log(users);

        console.log("Finished creating users!");
    } catch (error) {
        throw error
    }
}

async function createInitialEmployees() {
    console.log('creating initial employees')
    try {
        const createInitEmployee = [
            {
                firstName: 'devin',
                lastName: 'vogt',
                email: 'd@gmail.com'
            },

            {
                firstName: 'chris',
                lastName: 'vogt',
                email: 'c@gmail.com'
            },


        ]

        const employees = await Promise.all(createInitEmployee.map(Employee.createEmployee));
        console.log(employees)
        console.log("Finished creating employees!");
    } catch (error) {
        throw error

    }
}


async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUser();
        await createInitialEmployees();
    } catch (error) {
        throw error;
    }
}

/* if your table has foreign key dependencies, you'll want to create the foreign key table first before trying to associate it in the other table create function :) */

/* that's why we create inv, cat BEFORE individual products! */

module.exports = {
    rebuildDB,
};
