import { cars } from '../fakeDataBase/cars-data.js'
import { validateCarDataByCar } from './validationData/validation-data.js';

export function getAllCars(){
    return cars;
}

export function createCar(car){
    cars.push(car);
}

export function deleteCarById(id){
    cars.splice(id-1, 1);
}


export function findCarById(id){
    return cars.find((car)=> car.id === id);
}

export function validateCar(car){
    return validateCarDataByCar(car);
}