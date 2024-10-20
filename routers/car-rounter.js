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

    const car = carService.getCarById(carId);
    if(!car) return res.status(404).json({ message: 'Samochod o podanym ID nie został znaleziony.' });

    res.status(200).json(car);
});

carRouter.post('/', (req, res) => {
    const car = req.body;

    if (!carService.validateCar(car)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const carToCreate = carService.getCarById(car.id);
    if (carToCreate) {
        return res.status(400).json({ message: 'Samochod z takim id juz istnieje' });
    }

    carService.createCar(car);
    res.status(201).json(car);
});

carRouter.delete('/:id', (req, res) => {
    const carId = Number(req.params.id);

    if (carId < 1) {
        return res.status(400).json({ message: 'Nieprawidlowe ID samochodu.' });
    }

    const car = carService.getCarById(carId);

    if (!car) {
        return res.status(404).json({ message: 'Samochod o podanym ID nie został znaleziony.' });
    }

    carService.deleteCarById(carId);
    res.status(200).json({ message: 'Samochod o ID: ' + carId + ' zostal usuniety' });
});


carRouter.put('/:id', (req, res) => {
    const carId = Number(req.params.id); 
    const newCar = req.body;  
    newCar.id = carId;  
    //Podobnie jak Post wymaga, by w ciele żądania znajdował się komplet danych umożliwiających utworzenie całego obiektu po stronie serwera.
    //W odpowiedzi serwer powinien wysłać odpowiedź CREATED lub w przypadku aktualizacji, NO_CONTENT.
    if (!carService.validateCar(newCar)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const existingCar = carService.getCarById(carId);

    if (!existingCar) {
        carService.createCar(newCar);
        return res.status(201).json(newCar);
    }

    Object.assign(existingCar, newCar);
    const allCars = carService.getAllCars();
    Object.assign(allCars, existingCar);
    
    res.status(204).send();
});

carRouter.patch('/:id', (req, res) => {

    const carId = Number(req.params.id);

    const car = carService.getCarById(carId);
    if (!car) {
        return res.status(404).json({ message: 'Nie ma takiego samochodu o id: ' + carId });
    }

    //prepare fields car to update
    const carToUpdate = req.body;
    carToUpdate.id = carId;

    if(carToUpdate.engine !== undefined) {

        if(carToUpdate.engine.id===undefined) return res.status(404).json({ message: 'Podaj id silnika'});

        const engine = carService.getEngineByEngineId(carToUpdate.engine.id);
        if(!engine) return res.status(404).json({ message: 'Nie ma takiego silnika o id: ' + carToUpdate.engine.id });

        carToUpdate.engine = engine;
    }


    if (!carService.validateCar(carToUpdate)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    Object.assign(car, carToUpdate);
    const allCars = carService.getAllCars();
    Object.assign(allCars, car);

    res.status(200).json(car);
});