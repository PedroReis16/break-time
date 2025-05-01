
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
  },
  async getStudents(req, res) {
    try {
      const { name, register } = req.query;
      const filter = { name, register };
      const students = await dao.findAllStudentsAsync(filter);

      if (!students || students.length === 0) {
        return res.status(204).json([]);
      }

      const responseStudents = students.map((student) => ({
        id: student.id,
        register: student.register,
        name: student.name,
        photo: `data:image/jpeg;base64,${student.photo.toString("base64")}`,
      }));

      return res.json(responseStudents);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Erro ao buscar alunos. Erro: ${error}` });

    }
  },
  async getStudent(req, res) {
    try {
      const { id } = req.params;
      const student = await dao.findStudentAsync(id);

      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado." });
      }

      const responseStudent = {
        id: student.id,
        register: student.register,
        name: student.name,
        photo: `data:image/jpeg;base64,${student.photo.toString("base64")}`,
      };

      return res.json(responseStudent);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Erro ao buscar aluno. Erro: ${error}` });
    }
  },
  async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { register, name } = req.body;
      const photo = req.file?.buffer;

      await dao.updateAsync(id, {
        name: name,
        photo: photo
      });

      return res.status(200).json({ message: "Aluno atualizado com sucesso." });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Erro ao atualizar aluno. Erro: ${error}` });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      await dao.deleteAsync(id);

      return res.status(204).send();
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ error: `Erro ao deletar aluno. Erro: ${error}` });
    }
  }

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
