const { body, query } = require('express-validator');

exports.create = [
  body('date').isISO8601().withMessage('Data inválida'),
  body('StudentId').isInt().withMessage('Código de aluno inválido'),
];

exports.queryDate = [
  query('date').optional().isISO8601(),
];
