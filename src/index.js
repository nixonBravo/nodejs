import app from "./app.js";
import { sequelize } from "./database/database.js";
import { PORT } from './config/config.js';

const port = PORT || 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false }); //force: false -> no elimina los datos de las tablas
    app.listen(port, () => {
      console.log(`----- Server is listening on port ${port} -----`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();