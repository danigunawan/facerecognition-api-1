const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

//now using an actual postgres database
// const database = {
// 	users: [
// 		{
// 			id:'123',
// 			name: 'John',
// 			email: 'john@gmail',
// 			password: 'cookies',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'124',
// 			name: 'Sally',
// 			email: 'sally@gmail',
// 			password: 'bananas',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	]
// }



app.get('/', (req, res)=>{
	// db.select('users.email',{User_Table_ID:'users.id'},'users.name','users.entries','users.joined','login.hash',{Login_Table_ID:'login.id'}).from('users').leftJoin('login', 'users.email', 'login.email')
	// .then(users => {
	// 	res.json(users);
	// })

  res.json("App is Working!");
})

app.post('/signin', (req, res) => {signin.handleSignin (req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})	//dependency injection
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3001, ()=> {
	console.log('app is running on port ' +(process.env.port || 3001))
});