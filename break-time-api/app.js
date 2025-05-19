const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const { sequelize } = require("./src/models");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

sequelize
  .sync({ alter: true })
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API ouvindo em http://localhost:${PORT}`);
});
