const PORT = process.env.PORT || 3099;
const express = require('express');
const app = express();
const api = require("./routes/api");
app.use(express.json());
app.use("/api", api);
app.listen(PORT, () => {
   console.log(`Server started on port: ${PORT}`);
});