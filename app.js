const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });
    //console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });
    //console.log(movie2.toJSON());

    // New instance
    const movie3 = await Movie.build({
      title: 'Toy Story 3',
      runtime: 103,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: false,
    });
    await movie3.save(); // save the record
    //console.log(movie3.toJSON());

    const person = await Person.create({
      firstName: "Yuli",
      lastName: "Toro"
    });//console.log(person.toJSON());
    // ... All model instances

    //..... Find models
    const movieById = await Movie.findByPk(1);
    //console.log(movieById.toJSON());

    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    //console.log(movieByRuntime.toJSON());

    var movies = await Movie.findAll();
    //console.log( movies.map(movie => movie.toJSON()) );

    var movies = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        isAvailableOnVHS: true
      },
      order: [['id', 'DESC']] // IDs in descending order
    });
    // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
    console.log( movies.map(movie => movie.toJSON()) );    

    //Attributes, Operators and Ordering
    var movies = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        isAvailableOnVHS: true,
        releaseDate: {
          [Op.gte]: '2004-01-01' // greater than or equal to the date
        },
        title: {
          [Op.endsWith]: 'Story 3'
        },
        runtime: {
          [Op.between]: [75, 115]
        }
      },
    });
    //console.log( movies.map(movie => movie.toJSON()) );

    //Update a Record with save()
    const toyStory3 = await Movie.findByPk(3);
    toyStory3.isAvailableOnVHS = true;
    //await toyStory3.save();
    await toyStory3.update({
      title: 'Trinket Tale 3',// this will be ignored
      isAvailableOnVHS: true,
    }, { fields: ['isAvailableOnVHS'] }); 

    //console.log( toyStory3.get({ plain: true }) );

    //.......Delete a Record
        // Find a record
        var toyStory = await Movie.findByPk(1);

        // Delete a record
        await toyStory.destroy();
    

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
