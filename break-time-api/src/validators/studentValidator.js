const { body, param } = require('express-validator');

exports.create = [
  body('ra').notEmpty().withMessage('RA obrigatório'),
  body('name').notEmpty().withMessage('Nome obrigatório'),
  body('photo').notEmpty().withMessage('Foto obrigatória'),
];

exports.update = [
  param('id').isInt(),
  ...exports.create,
];

exports.id = [
  param('id').isInt().withMessage('ID inválido'),
];
