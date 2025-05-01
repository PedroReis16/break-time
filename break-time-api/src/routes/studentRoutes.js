const express = require("express");
const multer = require("multer");
const studentController = require("../controllers/studentController");

const router = express.Router();

//Configuração do multer para salvar a imagem banco
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("photo"), studentController.create);
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.put("/:id", upload.single("photo"), studentController.updateStudent);
router.delete("/:id", studentController.delete);

module.exports = router;
