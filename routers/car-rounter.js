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
    if (!carService.isCarDataValid(car)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    const carToCreate = carService.getCarById(car.id);
    if (carToCreate) {
        return res.status(409).json({ message: 'Samochod z takim id juz istnieje' });
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

//done
carRouter.put('/:id', (req, res) => {
    const carId = Number(req.params.id); 
    const newCar = req.body;  
    newCar.id = carId;  
    
    if (!carService.isCarDataValid(newCar)) {
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

    const existingCar = carService.getCarById(carId);
    if (!existingCar) {
        return res.status(404).json({ message: 'Nie ma takiego samochodu o id: ' + carId });
    }

    
    const newCar = req.body;
    newCar.id = carId;

    //opcjonalnie jesli jest podany silnik trzeba sprawdzic czy istnieje i dodac go do obiektu
    if(newCar.engine !== undefined) {

        if(newCar.engine.id===undefined) return res.status(404).json({ message: 'Podaj id silnika'});

        const engine = carService.getEngineByEngineId(newCar.engine.id);
        if(!engine) return res.status(404).json({ message: 'Nie ma takiego silnika o id: ' + newCar.engine.id });

        newCar.engine = engine;
    }else{
        
        const engine = carService.getEngineByEngineId(existingCar.engine.id);
        if(!engine) return res.status(404).json({ message: 'Nie ma takiego silnika o id: ' + newCar.engine.id });

        newCar.engine = engine;
    }


    if (!carService.isCarDataValid(newCar)) {
        return res.status(400).json({ message: 'Błędna struktura danych.' });
    }

    Object.assign(existingCar, newCar);
    const allCars = carService.getAllCars();
    Object.assign(allCars, existingCar);

    res.status(200).json(existingCar);
});