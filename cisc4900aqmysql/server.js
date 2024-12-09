const express = require('express');
const mysql = require('mysql2');
require("dotenv").config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT; //specifies port 
const pool = mysql.createPool({host: process.env.HOST, database: process.env.DATABASE, user:process.env.USER, password: process.env.PASSWORD, connectionLimit: 10,});
//uses the .env file to connect to the correct database and login in with the correct credentials

app.use(cors());
app.use(express.json());

//pool.query acts as a way to structure a direct statement/command in order to be sent to the database to grab the requested information via mySQLcommands
//returns result if successful and returns error if unsuccessful

// POST request to create a new ticket and post to mySQL database
app.post("/ticket",(req, res) => { const ticket = req.body;
    pool.query("insert into ticket (name, subject, description, category ,impact, priority, urgency, technician , status) values (?,?,?,?,?,?,?,?,?)", [ticket.name, ticket.subject, ticket.description, ticket.category, ticket.impact, ticket.priority, ticket.urgency, ticket.technician, ticket.status], (error, result) => {
    if (error){ //check for error
        console.error(error);
        res.send(error);
        return;  //stop execution if error and returns error
    } res.send({id: result.insertId, ...ticket}); //if successful then inputs new ticket + fields in to the database
    });
});
// PUT request to update an existing ticket
app.put("/ticket/:id", (req, res) => { 
    const {id} = req.params;
    const ticket = req.body; 
    pool.query("update ticket set ? where id = ?", [ticket, id],(error, result) => {
        if (error){ //check for errors
            console.error(error);
            res.send(error);
            return; //stop execution if error and returns error
        } res.send({...ticket,id}); //if successful then returns updates to specific ticket via ID  
    });
});
// DELETE request to delete a ticket
app.delete("/ticket/:id", (req, res) => {
    const id = req.params.id;
    pool.query("delete from ticket where id = ?", [id], (error, result) => {
      if (error) { //check for errors
        console.error(error);
        res.send(error);
        return; //stop execution if error and returns error
      } res.send({ message: "Ticket deleted successfully" });  //if successful then ticket is deleted and tech is prompted with successful deletion
    });
  }); // GET request to retrieve all tickets from database
app.get("/all", (req, res) => { 
    pool.query('select * from ticket', (error, result) =>  {
        if (error){ //check for errors
            console.error(error);
            res.send(error);
            return;  //stop execution if error and returns error
        } res.send(result);   //if successful then returns to the user with all the available tickets listed in database
    });
}); //GET request to retrieve a specific ticket by ID
app.get("/ticket/:id", (req, res) => { 
    const id = req.params.id;
    pool.query('select * from ticket where id = ?', [id], (error, result) =>  {
        if (error){ //check for errors
            console.error(error);
            res.send(error);
            return; //stop execution if error and returns error
        } res.send(result); //if successful return info of specified ticket by ID
    });
}); // Start the server and listen on the specified port
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });


//Example of a ticket object
// {
//     "name": "John Doe",
//     "subject": "Website Issue",
//     "description": "The website is down",
//     "category": "Software Issue",
//     "impact": "High",
//     "priority": "High",
//     "urgency": "High",
//     "technician": "Jane Doe",
//     "status": "Open"
// }

//Example of a response object for a GET request
// [
//   {
//     "id": 1,
//     "name": "John Doe",
//     "subject": "Website Issue",
//     "description": "The website is down",
//     "category": "Software Issue",
//     "impact": "High",
//     "priority": "High",
//     "urgency": "High",
//     "technician": "Jane Doe",
//     "status": "Open"
//   }
// ]