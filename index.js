import express from 'express';
import * as service from './car-service.js';

const app = express();
app.use(express.json());

app.get('/cars', (req, res) => {
    res.send(JSON.stringify(service.getAllCars()));
});

app.post('/cars', (req, res) => {
    service.createCar(req.body);
    res.send("Hihio");
});

app.get('/cars/:mark', (req, res) => {
    res.send(JSON.stringify(getAllCars()));
});

app.listen(8080, () => {
    console.log("Server Listening on PORT: 8080");
});

//POST
//GET
//PUT
//PATCH
//DELETE
//app.put('/articles/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update an article...
//     res.json(req.body);
//   });
  
//   app.delete('/articles/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
//   });