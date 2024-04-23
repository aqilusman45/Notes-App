//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
const cors = require('cors')
const notesController = require("./controllers/notesController.js");
const usersController = require('./controllers/usersController.js')
const cookieParser = require("cookie-parser")
const requireAuth = require('./middleware/requireAuth.js')
//create an express app
const app = express();

//Configure express app
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:true,credentials:true}))

//Connect To database
connectToDb();

//Authentication Routing

app.post('/signup',usersController.signup)
app.post('/login',usersController.login)
app.get('/logout',usersController.logout)
app.get('/check-auth',requireAuth ,usersController.checkAuth)

//Routing

app.get("/notes", notesController.fetchNotes);

app.get("/notes/:id", notesController.fetchNote);

app.post("/notes", notesController.createNote);

app.put("/notes/:id", notesController.updateNote);

app.delete("/notes/:id", notesController.deleteNote);

//start our server
app.listen(3000);
