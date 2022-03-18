const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://matthedud:FSBN5YY7U4DUv1qh@cluster0.yyotl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( async () => {
    await Recipe.create({
      title: "Poisson",
      level: "Amateur Chef",
      ingredients: ["Thon", "oeuf", "mayo"],
      cuisine: "Rouge",
      dishType: "breakfast",
      image: "https://www.oceano.org/wp-content/uploads/2020/09/Thon-blanc-Collections-de-lInstitut-oceanographique-Michel-Dagnino-768x401.jpg",
      duration: 3,
      creator: "Aquaman",
      created: new Date(),
    })
    const savedRecepies = await Recipe.insertMany(data)
    savedRecepies.forEach(recepi=>console.log('title', recepi.title))
    await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
    await Recipe.deleteOne({title:"Carrot Cake"})
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  