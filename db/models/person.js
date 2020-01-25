const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init(
    // Attributes object
    {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: {
              notNull: {
                msg: 'Please provide a value for "firstName"',
              },
              notEmpty: {
                msg: 'Please provide a value for "firstName"',
              }
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: {
              notNull: {
                msg: 'Please provide a value for "firstName"',
              },
              notEmpty: {
                msg: 'Please provide a value for "firstName"',
              }
            },
        }
    },
    // Model options object
    { 
        freezeTableName: true,
        sequelize 
    }
  );

  return Person;
};