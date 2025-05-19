const { Delivery, Student } = require('../models');

exports.list = async (req, res) => {
  const where = {};
  if (req.query.date) where.date = req.query.date;

  const deliveries = await Delivery.findAll({
    where,
    include: Student,
  });

  res.json(deliveries);
};

exports.create = async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
