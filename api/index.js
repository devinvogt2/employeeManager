const apiRouter = require("express").Router();
const usersRouter = require("./user");
const employeeRouter = require("./employees");

apiRouter.use("/user", usersRouter);
apiRouter.use("/employees", employeeRouter);

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});
apiRouter.post("/hello", (req, res, next) => {
  res.send({
    message: "hello world",
  });
});

// place your routers here

module.exports = apiRouter;
