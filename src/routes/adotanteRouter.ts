import express from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../config/dataSource';
import AdotanteController from '../controller/AdotanteController';

const router = express.Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));

const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criarAdotante(req, res));
router.get("/", (req, res) => adotanteController.listarAdotantes(req, res));
router.put("/:id", (req, res) => adotanteController.atualizarAdotante(req, res));
router.delete("/:id", (req, res) => adotanteController.excluirAdotante(req, res));
router.patch("endereco/:idAdotante", (req, res) => adotanteController.atualizarEndereco(req, res));

export default router;