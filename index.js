//45 Connect MongoDB with Nodejs && 46 Display MongoDB Data
// 49 - post api , 50 - Delete api
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const dbName = "school";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

// async function dbConnection(){
//     await client.connect()

//     const db = client.db(dbName);
//     const collection = db.collection('student');

//     const result = await collection.find().toArray()

//     console.log(result);
// }

// dbConnection()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

client.connect().then((connection) => {
  const db = connection.db(dbName);

  app.get("/api", async (req, res) => {
    const collection = db.collection("student");
    const studentResult = await collection.find().toArray();
    res.send(studentResult);
  });

  app.get("/ui", async (req, res) => {
    const collection = db.collection("student");
    const result = await collection.find().toArray();
    res.render("student", { result });
  });

  app.get("/add", (req, res) => {
    res.render("add-student");
  });

  app.post("/add-student", async (req, res) => {
    const collection = db.collection("student");
    const result = await collection.insertOne(req.body);
    // res.render("student",{result});

    console.log(result);

    res.send("Data Saved");
  });

  //49 Post api
  app.post("/addStudentAPi", async (req, res) => {
    console.log(req.body);

    const { name, age, email } = req.body;
    if (!name || !age || !email) {
      res.send({ message: "Operation Failed", succees: false });
      return false;
    }

    const collection = db.collection("student");
    const result = await collection.insertOne(req.body);
    res.send({ message: "Data Stored", sucess: true, result: result });
  });

  //50 Delete api
  app.delete("/delete/:id", (req, res) => {
    console.log(req.params.id);
    const collectionn = db.collection("student");
    const result = collectionn.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.send({ message: "Student Data Deleted", succees: true });
    } else {
      res.send({
        message: "Student Data Not Delete , Try again later",
        succees: false,
      });
    }
  });

  app.get("/ui/delete/:id", async (req, res) => {
    console.log(req.params.id);
    const collectionn = db.collection("student");
    const result = await collectionn.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      // res.send({ message: "Student Data Deleted", succees: true });
      res.send("<h1>Studet record deleted</h1>")
    } else {
       res.send("<h1>Studet record not deleted</h1>")
      // res.send({
      //   message: "Student Data Not Delete , Try again later",
      //   succees: false,
      // });
    }
  });
});

// app.set("view engine",'ejs')

// app.get('/', async (req,res)=>{
//   await client.connect();
//   const db= client.db(dbName);
//   const collection = db.collection('student');

//   const result = await collection.find().toArray();

//   console.log(result);

//   res.render("student",{result});

// })

app.listen(3210);
//44 Basic cmd MongoDB

//43  MongoDB installation

//42 DataBase , MongoDB

//41 API Example with dynamic Routes
/*
import express from  'express';
import userData from './users.json' with {type:'json'}

const app = express();

app.get('/',(req,res)=>{
  console.log(userData);
  //  res.send("User List Api")
  res.send(userData);

})

app.get("/user/:id",(req,res)=>{
  const id = req.params.id;
  console.log(id);

  let filterData = userData.filter((user)=>user.id==id)


  res.send(filterData);
})

app.listen(3200);

*/

//40 Dynamic Routes - part of url can change depending on the request
/*
import express from 'express';
const app = express();

app.get("/",(req,res)=>{
  const users = ['imam','user1','user2','user3','user4'];
  let data = `<ul>`;
   for(let i =0 ; i< users.length; i++){
    data+=`<li><a href="user/${users[i]}">${users[i]} </a> </li>`
    // console.log(users[i]);
   }
  //  res.send("This is home page ")
  data+=`</ul>`
  res.send(data);
})

app.get("/user/:name",(req,res)=>{
  console.log(req.params.name);
  const userName = req.params.name;
  res.send(`This is ${userName} profile page`)
})


app.listen(3200)

*/

//39 MVC architecture
/*
import express from 'express';
import { handleUsers } from './controller/userController.js';
const app = express();

app.set('view engine','ejs')
app.get('/users',handleUsers)



app.listen(3200);

 */

// 38 Loops and conditons
/*
import express from 'express';
const app =express();

app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

app.get('/add-user',(req, res)=>{

  res.render('addUser');

})

app.post('/submit-user',(req,res)=>{
  console.log(req.body);

  res.render('submitUser')

})

app.get('/users',(req,res)=>{
  const users=['imam','ritik','vishal','raju','shivam','danish','anup'];
  res.render('users',{users:users})
})





app.listen(3200);


*/

//37  Submit form and display
/*
import express from "express";
const app = express();


app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')

app.get('/add-user',(req,res)=>{

  res.render('addUser')

})


app.post('/submit-user',(req,res)=>{

  console.log(req.body);

  res.render('submitUser',req.body);

})



app.listen(3200)
*/

// 36 EJS Template  -  template engine used with express to generate dynamic HTML on the server
/*
import express from "express";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send("Test");
  res.render("home", { name: "Nazre Imam ", titlee: "ejs learning from CSBS" });
});

app.listen(3200);

*/

//35 Error Handling Middleware  -  That catches and handle error occuring in ur express appication
/*
import express from 'express';
const app = express();

app.get('/',(req,res)=>{
  res.send("Home Page ")
})
app.get('/users',(req,res)=>{
  res.send1("Users Page ")
})
app.get('/error',(req,res)=>{
  res.send("Error Page ")
})

function errorHandling(error,req,res,next){

  res.status(error.status || 500).send("Try after some time");

}
app.use(errorHandling)
app.listen(3200);
*/

//34 External Middleware - that is not built into express
/* 
import express from 'express';
import morgan from 'morgan';
const app = express();
app.use(morgan('dev'))


app.get('/',(req,res)=>{
  res.send("Home page")
})

app.get('/wait',(req,res)=>{
  setTimeout(()=>{
    res.send("Result after 1 min")
  },1000)
})

app.listen(3200)

*/

//33 Built in middleware  --- that came predefined in express
/*
import express from 'express';
import path from 'path';
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))



app.get('/',(req,res)=>{
  const filepath = path.resolve("view/home.html")
  res.sendFile(filepath)
})
app.get('/login',(req,res)=>{
  res.send(`
    <form action ="/submit" method ="post"> 

    <input type="text" placeholder="Enter email" name="email"/>
    <input type="password" placeholder="Enter Password" name ="password"/>
    <button> Login </button>

    </form>
    `)
})

app.post('/submit',(req,res)=>{
  console.log(req.body);
  res.send("Submit")
})

app.get("/user",(req,res)=>{
  res.send("User Page")
})



app.listen(3200);

*/

//32 route middileware  - its used only for a specific middleware
/*
import express from 'express';
const app = express();


function checkAgeRouteMiddleware(req,res,next){
  console.log(req.query.age);
 if(!req.query.age || req.query.age < 18){
  res.send("You are not allowed to used this website")
 }else{
  next()
 }
}

function checkURLteMiddleware(req,res,next){
  console.log("This request url is ", req.url);
  next()
}

app.get('',(req,res)=>{
  res.send('<h1> Home Page  </h1>')
})

app.get('/login',checkURLteMiddleware,(req,res)=>{
  res.send("<h1>Login Page</h1>")
})

app.get('/user',checkAgeRouteMiddleware,(req,res)=>{
  res.send("<h1> User Page </h1>")
})

app.get('/products',(req,res)=>{
  res.send("<h1> Product page </h1>")
})



app.listen(3200);

*/

//31 Age check & IP Address
/*
import express from "express";
const app = express();

// function checkAge(req, res, next){

//   if(!req.query.age || req.query.age < 18){
    
//     res.send("Alert! you not access this page")

//   }{
//     next();
//   }
// }

function checkIP(req, res, next){
   const ip = req.socket.remoteAddress
  console.log(ip);  
  next()
}

app.use(checkIP)

app.get("/", (req,res)=>{
  res.send("Home Page")
})

app.get("/login", (req, res)=>{
  res.send("Login Page")
})

app.get("/admin",(req, res)=>{
  res.send("Admin page")
})
app.listen(3200);

*/

//30 Middleware - its function that runs b/w the client req and server res
/*
import express from "express";
const app = express();

// function checkRoute(req, res, next) {
//   console.log("User is accessing this " + req.url + " page");
//   next();
// }

app.use((req, res, next) => {
  console.log("User is accessing this " + req.url + " page");
  next();
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/user", (req, res) => {
  res.send("User Page");
});

app.get("/profile", (req, res) => {
  res.send("Profile Page");
});

app.listen(3200);

*/

// 28  Render html file in node.js
/*
import { log } from 'console';
import express from 'express'
import path from 'path'

const app = express();

const publicPath =path.resolve('public');

app.use(express.static(publicPath));

console.log(publicPath)

app.get('/',(req,res)=>{

  const absPath= path.resolve('view/home.html');
  res.sendFile(absPath);
})

app.get("/login",(req,res)=>{
       const absPath = path.resolve('view/login.html');
       res.sendFile(absPath)
})

app.use((req,res)=>{
  res.status(404).sendFile(path.resolve('view/404.html'))
})

 

app.listen(3200);  */

//  27 Render html elements and forms
/*
import express from 'express';
import login from './pages/login.js';
import submit from './pages/submit.js';
import home from './pages/home.js';


const app = express();

app.get('/',(req, res)=>{
  res.send(home())
})

app.get("/login",(req,res)=>{
  res.send(

    login()
   
  )
})
 
app.post("/submit",(req,res)=>{
  res.send(submit())

})
  



app.listen(3200);
*/

/// ---------------------   //

// // const express = require('express');

// import express from "express";
// import home from "./pages/home.js";
// import { about } from "./pages/about.js";
// import { express } from 'express';
// import { express } from 'express';

// // const express = require('express')(); directly use

// const app = express();

// // app.get("",(req, resp)=>{
// //    resp.send("<h1>Basic express js </h1>")
// // })

// // app.get("/about",(req,resp)=>{
// //     resp.send("<h1>This is about page </h1>")
// // })

// app.get("", (req, res) => {
//   res.send(home());
// });

// app.get("/about", (req, res) => {
//   res.send(about());
// });

// app.listen(3200);
