import {data} from './fake-database.js';
import { validate } from './validation-data.js';

export function getAllCars(){
    return data;
}

export function getCarsByMark(){
    return data.forEach((car)=>{
        
    })
}

export function createCar(car){
    data.push(car);
}

export function deleteCarById(id){
    data.splice(id-1, 1);
}


export function findCarById(id){
    return data.find((car)=> car.id === id);
}

export function validateCar(car){
    return validate(car);
}