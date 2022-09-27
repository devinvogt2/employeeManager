import axios from "axios";

const baseURL = 'http://localhost:4000';
if (typeof baseURL !== 'undefined') {
    axios.defaults.baseURL = baseURL;
}

//get user by id
// export async function getUserById() {
//     try {
//         const { data } = await axios.get(`api/user/:id`)
//         return data
//     } catch (error) {
//         console.error(error)
//     }
// }

export async function getUserById() {
    try {
        const { data } = await axios.get(`api/user/me`)
        return data
    } catch (error) {
        console.error(error)
    }
}

// admin ability: find all user
export async function getAlluser() {
    try {
        const { data } = await axios.get(`api/user`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// userCredentials: { username, password } *register*
export async function signUpUser(userCredentials) {
    try {
        console.log({ userCredentials })
        const { data } = await axios.post(`api/user/register`, userCredentials)
        delete userCredentials.password;
        return data
    } catch (error) {
        console.error(error)
    }
}

//log in
export async function logInUser(userCredentials) {
    try {
        console.log({ userCredentials });
        const { data } = await axios.post(`/api/user/login`, userCredentials);
        delete userCredentials.password;
        return data;
    } catch (error) {
        console.error(error);
    }
}




//update user
export async function updateUser() {
    try {
        const { data } = await axios.patch(`/api/user/:id`);
        return data;
    } catch (error) {
        console.error(error);
    }
}



//delete a user
export async function deleteUser() {
    try {
        const { data } = await axios.delete(`api/user/:id`);
        return data;
    } catch (error) {
        console.error(error);
    }
}