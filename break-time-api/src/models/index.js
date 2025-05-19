const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Student = require('./Student')(sequelize);
const Authorization = require('./Authorization')(sequelize);
const Delivery = require('./Delivery')(sequelize);

Student.hasMany(Authorization);
Authorization.belongsTo(Student);

Student.hasMany(Delivery);
Delivery.belongsTo(Student);

module.exports = {
  sequelize,
  Student,
  Authorization,
  Delivery,
};
