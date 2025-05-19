const { body, param, query } = require('express-validator');

exports.create = [
  body('date').isISO8601().withMessage('Data inválida'),
  body('StudentId').isInt().withMessage('Código de aluno inválido'),
  body('quantity').isInt({ min: 1, max: 3 }).withMessage('Quantidade deve ser entre 1 e 3'),
];

exports.update = [
  param('id').isInt(),
  ...exports.create,
];

exports.queryDate = [
  query('date').optional().isISO8601(),
];
