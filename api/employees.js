const express = require("express");
const employeeRouter = express.Router();
const { Employee } = require("../db");

//get all employees route
employeeRouter.get("/", async (req, res, next) => {
    try {
        const employees = await Employee.getAllEmployees();
        res.send({ "All Employees In Database": employees })
    } catch (error) {
        next(error)
    }
})

//get employee by id route
employeeRouter.get("/:id", async (req, res, next) => {
    try {
        const employee = await Employee.getEmployeeById(req.params.id);
        res.send({ "Selected Employee By Id": employee })
    } catch (error) {
        next(error)
    }
})

//create employee route
employeeRouter.post("/", async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
        } = req.body

        const employee = await Employee.createEmployee({
            firstName,
            lastName,
            email
        })

        res.send({ "Created New Employee!": employee })
    } catch (error) {
        next(error)
    }
})


//update employee by id route
employeeRouter.patch("/:id", async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email
        } = req.body

        const employee = await Employee.updateEmployee({
            id: req.params.id,
            firstName,
            lastName,
            email
        })

        res.send({ "Updated Employee in Database": employee })
    } catch (error) {
        next(error)
    }
})

//delete employee by id route
employeeRouter.delete("/:id", async (req, res, next) => {
    try {
        const deleteEmployee = await Employee.deleteEmployee(req.params.id)
        res.send({ "Deleted Employee": req.params.id, deleteEmployee })
    } catch (error) {
        next(error)
    }
})








module.exports = employeeRouter;