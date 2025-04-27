const app = require("./app");
const sequelize = require("./config/database");

//Database connection
sequelize
  .sync({ force: false }) // { force: true } to drop and recreate the database
  .then(() => {
    console.log("Database connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
