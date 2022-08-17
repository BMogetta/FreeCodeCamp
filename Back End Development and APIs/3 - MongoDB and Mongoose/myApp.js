require('dotenv').config();

// Install and Set Up Mongoose
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

//CRUD Part I - CREATE

const personSchema = mongoose.Schema({
  name : {
    type: String,
    require: true
  },
  age :  Number,
  favoriteFoods : [String]
})

const Person = mongoose.model('Person', personSchema)
//Create and Save a Record of a Model

const createAndSavePerson = (done) => {
  const bruno = new Person( {name: "bruno", age: 30, favoriteFoods: ["pizza"]} );
  bruno.save( (error, data)  => {
    if(error) return done(error);
    done(null, data);
  })
};

//Create Many Records with model.create()

const arrayOfPeople = [
  {name: "bruno", age: 30, favoriteFoods: ["pizza"]},
  {name: "pedro", age: 31, favoriteFoods: ["pizza"]},
  {name: "juan", age: 32, favoriteFoods: ["pizza"]}
];

//Create Many Records with model.create()

const createManyPeople = (arrayOfPeople, done) => {

  Person.create( arrayOfPeople, (error, people)  => {
    if(error) return done(error);
    done(null, people);
  });
};

//Use model.find() to Search Your Database

const findPeopleByName = (personName, done) => {
  Person.find( { name: personName}, (error, info)  => {
    if(error) return done(error);
    done(null, info);
  });
};

//Use model.findOne() to Return a Single Matching Document from Your Database

const findOneByFood = (food, done) => {
  Person.findOne( { favoriteFoods: food}, (error, info)  => {
    if(error) return done(error);
    done(null, info);
  });
};

//Use model.findById() to Search Your Database By _id

const findPersonById = (personId, done) => {
  Person.findById( {_id: personId} , (error, info)  => {
    if(error) return done(error);
    done(null, info);
  });
};

//Perform Classic Updates by Running Find, Edit, then Save

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById( {_id: personId} , (error, person)  => {
    if(error) return done(error);
    person.favoriteFoods.push(foodToAdd);
    person.save( (error, update) => {
      if(error) return done(error);
      done(null, update);
    })
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate( {name: personName}, {age: ageToSet} , { new: true }, (error, info)  => {
    if(error) return done(error);
    done(null, info);
  });
};

//Delete One Document Using model.findByIdAndRemove

const removeById = (personId, done) => {
  Person.findByIdAndRemove( {_id: personId}, (error, info)  => {
    if(error) return done(error);
    done(null, info);
  });
};

//Delete Many Documents with model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, response) => {
    if(error) return done(error);
    done(null, response);
  })
};

//Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 1 })
        .limit(2)
        .select({ age: 0 })
        .exec( (error, documents) => {
          if(error) return done(error);
          done(null, documents);
          })
  };


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
