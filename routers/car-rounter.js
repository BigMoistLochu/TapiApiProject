import express from "express";
import * as carService from '../services/car-service.js';

export const carRouter = express.Router();

carRouter.get('/', (req, res) => {
    const cars = carService.getAllCars();
    res.status(200).json(cars);
});

//query paramsy opcjonalnie
carRouter.get('/:id', (req, res) => {
    const carId = Number(req.params.id);
    if(carId < 1 ) return res.status(400).json({ message: 'Nieprawidlowe ID samochodu.' });
    const car = carService.findCarById(carId);
    if(!car) return res.status(404).json({ message: 'Samochod o podanym ID nie został znaleziony.' });
    res.status(200).json(car);
});

carRouter.post('/', (req, res) => {
    const car = req.body;

    if (!carService.validateCar(car)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    carService.createCar(car)
    res.status(201).json(car);
});

carRouter.delete('/:id', (req, res) => {
    const carId = Number(req.params.id);

    if (carId < 1) {
        return res.status(400).json({ message: 'Nieprawidlowe ID samochodu.' });
    }

    const car = carService.findCarById(carId);

    if (!car) {
        return res.status(404).json({ message: 'Samochod o podanym ID nie został znaleziony.' });
    }

    carService.deleteCarById(carId);
    res.status(200).json({ message: 'Samochod o ID: ' + carId + ' zostal usuniety' });
});

//not-tested
carRouter.put('/:id', (req, res) => {
    const carId = Number(req.params.id); 
    const newCar = req.body;  
    newCar.id = carId;  

    if (!carService.validateCar(newCar)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    
    const existingCar = carService.findCarById(carId);
    if (!existingCar) {
        return res.status(404).json({ message: 'Nie ma takiego samochodu o id: ' + carId });
    }

    const allCars = carService.getAllCars();
    const updatedCars = allCars.map(car => car.id === carId ? newCar : car);

    carService.saveAllCars(updatedCars);

    res.json(newCar);  
});

carRouter.patch('/:id', (req, res) => {

    const carId = Number(req.params.id);
    const carToUpdate = req.body;
    carToUpdate.id = Number(carId);

    if (!carService.validateCar(carToUpdate)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const car = carService.findCarById(carId);
    if (!car) {
        return res.status(404).json({ message: 'Nie ma takiego samochodu o id: ' + carId });
    }

    Object.assign(car, carToUpdate);
    const allCars = carService.getAllCars();
    Object.assign(allCars, car);

    res.json(car);
});