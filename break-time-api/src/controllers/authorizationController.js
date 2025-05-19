const { Authorization, Student } = require('../models');

exports.list = async (req, res) => {
  const where = {};
  if (req.query.date) where.date = req.query.date;

  const auths = await Authorization.findAll({
    where,
    include: Student,
  });

  res.json(auths);
};

exports.create = async (req, res) => {
  try {
    const auth = await Authorization.create(req.body);
    res.status(201).json(auth);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const auth = await Authorization.findByPk(req.params.id);
  if (!auth) return res.sendStatus(404);
  await auth.update(req.body);
  res.json(auth);
};

exports.remove = async (req, res) => {
  const auth = await Authorization.findByPk(req.params.id);
  if (!auth) return res.sendStatus(404);
  await auth.destroy();
  res.sendStatus(204);
};
