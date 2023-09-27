import { AppDataSource } from './data-source';
import express from 'express';
import catRouter from "./routes/catRouter";
import bodyParser from 'body-parser';
import hoomanRouter from './routes/hoomanRouter';

AppDataSource.initialize()
.then(async () => {
    console.log("Connexion a la base de donnée réussi.");
})
.catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", hoomanRouter);
app.use("/cat", catRouter);
app.listen(8000, () => {
  console.log(`Le serveur est en écoute sur le port 8000`);
});
