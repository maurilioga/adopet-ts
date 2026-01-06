import express from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")

);

const petController = new PetController(petRepository);

router.post("/", (req, res) => petController.criarPet(req, res));
router.get("/", (req, res) => petController.listarPets(req, res));
router.put("/:id", (req, res) => petController.atualizarPet(req, res));
router.delete("/:id", (req, res) => petController.excluirPet(req, res));
router.put("/adotar/:id/:idAdotante", (req, res) => petController.adotaPet(req, res));
// router.get("/buscarPorte", (req, res) => petController.buscarPetPorPorte(req, res));
router.get("/filtro", (req, res) => petController.buscarPetPorFiltro(req, res));

export default router;