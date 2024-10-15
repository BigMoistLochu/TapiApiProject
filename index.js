import express from 'express';
import * as service from './car-service.js';

const app = express();
app.use(express.json());

app.get('/cars', (req, res) => {
    res.send(JSON.stringify(service.getAllCars()));
});

app.post('/cars', (req, res) => {
    const car = req.body;
    if (!service.validateCar(car)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    service.createCar(car)
    res.status(201).json(car);
});

app.delete('/cars/:id', (req, res) => {
    const carId = Number(req.params.id);

    if (carId < 1) {
        return res.status(400).json({ message: 'Nieprawidlowe ID samochodu.' });
    }

    const car = service.findCarById(carId);

    if (!car) {
        return res.status(404).json({ message: 'Samochod o podanym ID nie został znaleziony.' });
    }

    service.deleteCarById(carId);
    res.status(200).json({ message: 'Samochod o ID: ' + carId + ' zostal usuniety' });
});

app.put('/cars/:id', (req, res) => {
    //caly zasob o podanym id nawet jesli nie sa podane parametry
});

app.patch('/cars/:id', (req, res) => {

    const carId = Number(req.params.id);
    const carToUpdate = req.body;
    carToUpdate.id = Number(carId);

    if (!service.validateCar(carToUpdate)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const car = service.findCarById(carId);
    if (!car) {
        return res.status(404).json({ message: 'Nie ma takiego samochodu o id: ' + carId });
    }

    Object.assign(car, carToUpdate);
    const allCars = service.getAllCars();
    Object.assign(allCars, car);

    res.json(car);
});

app.listen(8080, () => {
    console.log("Server Listening on PORT: 8080");
});



//DELETE