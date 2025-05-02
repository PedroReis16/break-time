const app = require("./app");
const sequelize = require("./config/database");

const appPort = process.env.PORT || 3000;

//Database connection
sequelize
  .sync({ force: false }) // { force: true } to drop and recreate the database
  .then(() => {
    console.log("Database connected successfully");

    app.listen(appPort, () => {
      console.log(`Server is running on port ${appPort}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
