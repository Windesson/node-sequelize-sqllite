const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init(
     // Attributes object
     {
     // Set custom primary key column
     id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },   
    title: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "title"',
        }
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "runtime"',
        },
        min: { 
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"',
        }
      }
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "releaseDate"',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
        },
      }
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // set default value
    },
  },   
  // Model options object
  { 
    timestamps: true, // enable/disable timestamps
    freezeTableName: true, // disable plural table names
    //tableName: 'my_movies_table',
    //modelName: 'movie',
    sequelize,
    paranoid: true, // enable "soft" deletes 
  });

  return Movie;
};