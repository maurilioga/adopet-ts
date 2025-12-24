import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(() => {
    console.log("Banco de Dados conectado!");
}).catch((erro) => {
    console.error("Erro ao conectar ao banco de dados: ", erro)
})

export default app;