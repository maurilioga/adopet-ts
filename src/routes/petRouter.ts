import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petController = new PetController();

router.post("/", petController.criarPet);
router.get("/", petController.listarPets);
router.put("/:id", petController.atualizarPet);
router.delete("/:id", petController.excluirPet);

export default router;