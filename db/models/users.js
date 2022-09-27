const client = require('../client');
const bcrypt = require("bcrypt")

module.exports = {
    getUser,
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
}

//create
async function createUser({
    username,
    password,
}) {
    try {
        const saltRounds = 5;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)

        const {
            rows: [user]
        } = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
            RETURNING *;
        `, [username, encryptedPassword])

        if (!user) {
            throw new Error(
                'Username already exists! please choose a different one'
            )
        }

        // delete user.password
        return user
    } catch (error) {
        throw error
    }
}

//read
async function getUser({ username, password }) {
    try {
        const user = await getUserByUsername(username);
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            delete user.password;
            return user;
        } else {
            throw new Error("Username and password combination does not match!");
        }
    } catch (err) {
        throw err;
    }
}

async function getUserByUsername(username) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
        SELECT * FROM users
        WHERE username=$1;
      `,
            [username]
        );

        if (!user) {
            throw new Error("User does not exist");
        }

        console.log({ user });
        console.log(user.id);

        // if the user exists, then they (by definition of how we create users)
        // have a cart already, and we need to associate it with the user object
        return user;
    } catch (err) {
        throw err;
    }
}

async function getAllUsers() {
    try {
        const {
            rows: users
        } = await client.query(`
            SELECT id, username FROM users;
        `)

        return users
    } catch (error) {
        throw error
    }
}

//get user by id
async function getUserById(userId) {
    try {
        const {
            rows: [user]
        } = await client.query(
            `
            SELECT * FROM users
            WHERE id=$1;     
            `,
            [userId]
        )
        return user
    } catch (error) {
        throw error
    }
}

// update
async function updateUser({
    id,
    username,
}) {
    try {
        const {
            rows: [user],
        } = await client.query(`
            UPDATE users
            SET username=$1
            WHERE id=$2
            RETURNING *;
        `, [username, id])

        delete user.password;
        return user;
    } catch (error) {
        throw error
    }
}

// delete

async function deleteUser(userId) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
        DELETE FROM users
        WHERE id=$1
        RETURNING *;
      `,
            [userId]
        );
        return user;
    } catch (error) {
        throw error
    }
}