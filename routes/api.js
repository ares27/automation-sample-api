const express = require("express");
const router = express.Router();

router
  .get("/greet", (req, res) => {
    if (!req.query.name || req.query.name === "")
    res.status(400).send({
        message: `error`,
        description: `parameter 'name' is required and cannot be empty or blank.`,
    });
    res.send({
        status: `Ok`,
        greeting: `Hi ${req.query.name}`,
    });
  })
  .get("/automation", (req, res) => {
        const obj = {
        status: 200,
        message: 'connected',
        description: {
                host: 'T1 Automation',
            }
        }
    res.status(200).json(obj);
 });

module.exports = router;