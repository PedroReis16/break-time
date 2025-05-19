const { Student } = require("../models");

exports.list = async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
};

exports.create = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

exports.update = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.sendStatus(404);
  await student.update(req.body);
  res.json(student);
};

exports.remove = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.sendStatus(404);
  await student.destroy();
  res.sendStatus(204);
};
