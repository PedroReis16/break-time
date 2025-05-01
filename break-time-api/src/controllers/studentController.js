
const dao = require("../dao/studentDao");

module.exports = {
  async create(req, res) {
    try {
      const { register, name } = req.body;
      const photo = req.file?.buffer;

      const student = await dao.createStudentAsync({
        register: register,
        name: name,
        photo: photo
      });

      await dao.createStudentAsync(student);
      return res.status(201).json({ message: "Aluno criado com sucesso." });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Erro ao criar aluno. Erro: ${error}` });
    }
  }

  // async create(req, res) {
  //   try {
  //     const { register: register, name: name } = req.body;
  //     const photo = req.file?.buffer;

  //     if (!register || !name || !photo) {
  //       return res
  //         .status(400)
  //         .json({ message: "Todos os campos são obrigatórios." });
  //     }

  //     const student = await Student.create({
  //       register: register,
  //       name: name,
  //       photo: photo,
  //     });
  //     return res.status(201).json(student);
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // },

  // async index(req, res) {
  //   try {
  //     const students = await Student.findAll();

  //     if (!students || students.length === 0) {
  //       return res.status(204).json([]);
  //     }

  //     return res.json(students);
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // },

  // async show(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const student = await Student.findByPk(id);
  //     if (!student)
  //       return res.status(404).json({ message: "Aluno não encontrado." });

  //     const resposeStudent = {
  //       id: student.id,
  //       register: student.register,
  //       name: student.name,
  //       photo: `data:image/jpeg;base64,${student.photo.toString("base64")}`,
  //     };

  //     return res.json(resposeStudent);
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // },

  // async update(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { ra, name } = req.body;

  //     const student = await Student.findByPk(id);
  //     if (!student)
  //       return res.status(404).json({ message: "Aluno não encontrado." });

  //     student.register = ra ?? student.register;
  //     student.name = name ?? student.name;
  //     if (req.file) {
  //       student.photo = req.file.buffer;
  //     }

  //     await student.save();
  //     return res.json(student);
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // },

  // async delete(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const student = await Student.findByPk(id);
  //     if (!student)
  //       return res.status(404).json({ message: "Aluno não encontrado." });

  //     await student.destroy();
  //     return res.status(204).send();
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // },
};
