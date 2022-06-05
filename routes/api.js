const express = require("express");
const router = express.Router();
const Joi = require("joi");
const axios = require("axios");

router
  .get("/", (req, res) => {
    const obj = { description: "connected", host: "T1 Automation" };
    res.status(200).json(obj);
  })
  .get("/jsonplaceholder", async (req, res) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/`
      );
      const responseData = response.data;
      res.send(responseData);
    } catch (ex) {
      res.status(404).send(ex.message);
    }
  })
  .post("/data", async (req, res) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      fullName: Joi.string().min(3).required(),
      departmentId: Joi.number().integer(),
    });
    const obj = {
      title: req.body.title,
      fullName: req.body.fullName,
      departmentId: parseInt(req.body.departmentId),
    };
    const result = Joi.validate(obj, schema);
    // console.log(result);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    try {
      const { title, fullName, departmentId } = obj;
      res.status(201).send({
        message: "You just posted!",
        data: {
          title,
          fullName,
          departmentId,
        },
      });
    } catch (ex) {
      res.send(ex.message);
    }
  })
  .post("/webhook", (req, res) => {
    res.send(`Ok`);
  });

module.exports = router;
